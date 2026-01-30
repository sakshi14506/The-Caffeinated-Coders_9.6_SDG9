
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["citizen", "council"], required: true },
  phone: String,          // citizen
  councilId: String       // council
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

