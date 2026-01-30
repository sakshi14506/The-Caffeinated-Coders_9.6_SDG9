const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const multer = require("multer");
const path = require("path");

/* Multer config */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/* POST complaint (with image) */
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, location } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const complaint = new Complaint({
    title,
    description,
    location,
    image: req.file ? req.file.filename : null
  });

  await complaint.save();
  res.json({ message: "Complaint submitted successfully", complaint });
});

/* GET all complaints */
router.get("/", async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

/* UPDATE status (Council) */
router.put("/:id", async (req, res) => {
  const updated = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json({ message: "Status updated", complaint: updated });
});

module.exports = router;
