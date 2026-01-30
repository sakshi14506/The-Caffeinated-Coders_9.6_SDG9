const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  complaintId: String,
  sender: String,        // citizen / council
  message: String
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);

