const Application = require("../Model/Application");
const User = require("../Model/User");
const Job = require("../Model/Job");

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

exports.getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("user", "_id username resume")
      .populate("job", "title type location");

    res.status(200).json({ message: "Applicants fetched", applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
