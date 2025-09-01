const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },

  resume: { type: String }, 

  skills: [String],

  experience: [
    {
      company: String,
      title: String,
      description: String,
    },
  ],

  project: [
    {
      title: String,
      description: String,
      techstack: [String],
    },
  ],

  education: [
    {
      school: String,
      major: String,
    },
  ],

  sociallinks: {
    linkedin: String,
    github: String,
    leetcode: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
