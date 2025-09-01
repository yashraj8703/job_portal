const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema({
  recruitername: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },

  phone: { type: String },

  company: { type: String, required: true },
  designation: { type: String },
  sociallinks: {
    linkedin: String,
  },
});

module.exports = mongoose.model("recruiter", RecruiterSchema);
