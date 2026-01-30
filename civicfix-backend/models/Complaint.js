const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId: String,
  issue: String,
  description: String,
  location: String,
  issueDate: String,
  status: { type: String, default: "Pending" },
  createdBy: String       // user id or phone
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);

