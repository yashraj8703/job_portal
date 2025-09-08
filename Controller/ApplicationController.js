const Application = require("../Model/Application");
const User = require("../Model/User");
const Job = require("../Model/Job");

//* authenticated users can apply to jobs

exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const userId = req.user.userId;

    const user = await User.findById(userId).select("resume");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.resume)
      return res.status(400).json({ message: "User resume is missing" });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await Application.findOne({ job: jobId, user: userId });
    if (existing) return res.status(400).json({ message: "Already applied" });

    const application = await Application.create({
      job: jobId,
      user: userId,
      resume: user.resume,
    });

    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//get applied jobs by a user

exports.getUserAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const applications = await Job.find({ user: userId }).populate({
      path: "job",
      select:
        "title company location employmentType requiredQualifications skillsRequired lastDateToApply",
    });
    res.status(200).json({
      msg: "✅ Applied jobs fetched successfully",
      total: applications.length,
      applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// listing applicantions - recruiters can see applicants who applied to thier job posts
exports.getApplicantsForRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.recruiter.recruiterId;
    const jobsRecruiter = await Job.find({ recruiter: recruiterId });
    if (!jobsRecruiter) {
      return res.status(404).json({ message: "❌ No job posted yet" });
    }
    const jobId = jobsRecruiter.map((job) => job._id);

    const applications = await Application.find({ job: { $in: jobId } })
      .populate({
        path: "user",
        select: "username email resume", // applicant info
      })
      .populate({
        path: "job",
        select: "title company location", // job info
      });
    res.status(200).json({
      msg: "✅ Applicants fetched successfully",
      recruiterId,
      totalJobs: jobsRecruiter.length,
      totalApplications: applications.length,
      applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// applications for a specific job
exports.getApplicantsForSpecificJob = async (req, res) => {
  try {
    const recruiterId = req.recruiter.recruiterId; // recruiter from token
    const { jobId } = req.params; // specific job id from route

    // check if job exists & belongs to this recruiter
    const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });
    if (!job) {
      return res
        .status(404)
        .json({ message: "❌ Job not found or not owned by this recruiter" });
    }

    // fetch applications for that job
    const applications = await Application.find({ job: jobId })
      .populate({
        path: "user",
        select: "username email resume",
      })
      .populate({
        path: "job",
        select: "title company location",
      });

    res.status(200).json({
      msg: "✅ Applicants fetched successfully",
      jobId,
      totalApplications: applications.length,
      applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
