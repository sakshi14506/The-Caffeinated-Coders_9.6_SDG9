const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

/* Raise complaint */
router.post("/", async (req, res) => {
  const data = req.body;

  const complaint = await Complaint.create({
    ...data,
    complaintId: "CF" + Date.now()
  });

  res.json(complaint);
});

/* Get all complaints (citizen / council) */
router.get("/", async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

/* Update status (council) */
router.patch("/:id", async (req, res) => {
  const updated = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
