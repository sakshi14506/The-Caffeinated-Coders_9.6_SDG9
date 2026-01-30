const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);
