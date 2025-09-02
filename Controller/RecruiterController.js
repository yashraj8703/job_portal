const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../Model/Recruiter");

exports.createrecruiter = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const recruiter = await Recruiter.create({
      ...rest,
      password: hashedPassword
    });

    res.status(201).json({
      message: "✅ Recruiter created successfully",
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

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const recruiterExists = await Recruiter.findOne({
      recruitername: username,
    });
    if (!recruiterExists) {
      return res.status(404).json({ msg: "No recruiter exists" });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      recruiterExists.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Wrong Password" });
    }
    const token = jwt.sign(
      { recruiterId: recruiterExists._id, role: "recruiter" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ msg: "Sign in successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Login failed",
      error: err.message,
    });
  }
};

exports.listAllrecruiters = async (req, res) => {
  try {
    const allrecruiters = await Recruiter.find({});
    res.status(200).json({
      msg: "recruiters listed successfully",
      recruiters: allrecruiters,
    });
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
    res
      .status(200)
      .json({ msg: "recruiter listed successfully", recruiter: recruiter });
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
    res.status(200).json({
      msg: "recruiter deleted successfully",
      recruiterId: deleterecruiter._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Failed to fetch recruiter",
      error: err.message,
    });
  }
};
