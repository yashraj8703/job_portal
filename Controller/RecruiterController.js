const express = require("express");
const Recruiter = require("../Model/Recruiter");

exports.createrecruiter = async (req, res) => {
  try {
    const recruiter = await Recruiter.create(req.body); 

    res.status(201).json({
      message: "✅ recruiter created successfully",
      recruiter,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "❌ Failed to create recruiter",
      error: err.message,
    });
  }
};

exports.listAllrecruiters = async (req, res) => {
  try {
    const allrecruiters = await Recruiter.find({});
    res.status(200).json({ msg: "recruiters listed successfully", recruiters: allrecruiters });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "❌ Failed to return recruiters",
      error: err.message,
    });
  }
};

exports.listrecruiterbyId = async (req, res) => {
  const recruiterId = req.params.recruiterId;
  try {
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: "❌ recruiter not found" });
    }
    res.status(200).json({ msg: "recruiter listed successfully", recruiter: recruiter });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Failed to fetch recruiter",
      error: err.message,
    });
  }
};

exports.deleterecruiterById = async (req, res) => {
  const recruiterId = req.params.recruiterId;
  try {
    const deleterecruiter = await Recruiter.findByIdAndDelete(recruiterId);
    if (!deleterecruiter) {
      return res.status(404).json({ message: "❌ recruiter not found" });
    }
    res.status(200).json({ msg: "recruiter deleted successfully", recruiterId: deleterecruiter._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Failed to fetch recruiter",
      error: err.message,
    });
  }
};
