const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// POST complaint
router.post("/", async (req, res) => {
  const { title, description, location } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const complaint = new Complaint({ title, description, location });
  await complaint.save();

  res.json({ message: "Complaint submitted successfully" });
});

// GET complaints
router.get("/", async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

module.exports = router;
// UPDATE complaint status (Council)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Status updated successfully",
      complaint: updated
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});
