const express = require("express");
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, resume, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      resume: resume || "",  
      ...rest,
    });

    res.status(201).json({
      message: "✅ User created successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "❌ Failed to create user",
      error: err.message,
    });
  }
};

exports.signinUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(404).json({ msg: "No user exists" });
    }
    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Wrong Password" });
    }
    const token = jwt.sign(
      { userId: userExists._id, role: "user" },
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

exports.listAllUsers = async (req, res) => {
  try {
    const allusers = await User.find({});
    res.status(200).json({ msg: "Users listed successfully", users: allusers });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "❌ Failed to return users",
      error: err.message,
    });
  }
};

exports.listUserbyId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }
    res.status(200).json({ msg: "User listed successfully", user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Failed to fetch user",
      error: err.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ message: "❌ User not found" });
    }
    res
      .status(200)
      .json({ msg: "User deleted successfully", userId: deleteUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Failed to fetch user",
      error: err.message,
    });
  }
};
