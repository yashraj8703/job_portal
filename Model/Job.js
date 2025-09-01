const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: {
    type: String,
    enum: ["Full-time", "Internship"],
    required: true,
  },
  company: { type: String, required: true },
  requiredQualifications: { type: [String], required: true },
  skillsRequired: { type: [String], required: true },
  experience: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  lastDateToApply: { type: Date, required: true },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter", 
    required: true,
  },
});


module.exports = mongoose.model("job", JobSchema);