const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
 job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resume: { type: String, required: true }, 
  status: { type: String, enum: ["applied","accepted", "rejected"], default: "applied" },

});


module.exports = mongoose.model("application", ApplicationSchema);