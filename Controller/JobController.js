const express = require("express");
const Job = require("../Model/Job");

exports.createjob = async (req, res) => {
  try {
    const job = await Job.create(req.body); 

    res.status(201).json({
      message: "✅ job created successfully",
      job,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "❌ Failed to create job",
      error: err.message,
    });
  }
};

exports.listAlljobs = async (req, res) => {
  try {
    const alljobs = await Job.find({});
    res.status(200).json({ msg: "jobs listed successfully", jobs: alljobs });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "❌ Failed to return jobs",
      error: err.message,
    });
  }
};

exports.listjobbyId = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "❌ job not found" });
    }
    res.status(200).json({ msg: "job listed successfully", job: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Failed to fetch job",
      error: err.message,
    });
  }
};

exports.deletejobById = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const deletejob = await Job.findByIdAndDelete(jobId);
    if (!deletejob) {
      return res.status(404).json({ message: "❌ job not found" });
    }
    res.status(200).json({ msg: "job deleted successfully", jobId: deletejob._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Failed to fetch job",
      error: err.message,
    });
  }
};
