const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* Send message */
router.post("/", async (req, res) => {
  const msg = await Message.create(req.body);
  res.json(msg);
});

/* Get messages (polling) */
router.get("/:complaintId", async (req, res) => {
  const msgs = await Message.find({
    complaintId: req.params.complaintId
  }).sort({ createdAt: 1 });

  res.json(msgs);
});

module.exports = router;

