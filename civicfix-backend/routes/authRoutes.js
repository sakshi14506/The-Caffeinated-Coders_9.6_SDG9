const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* Citizen login */
router.post("/citizen", async (req, res) => {
  const user = await User.create({
    role: "citizen",
    phone: req.body.phone
  });
  res.json(user);
});

/* Council login */
router.post("/council", async (req, res) => {
  const user = await User.create({
    role: "council",
    councilId: req.body.councilId
  });
  res.json(user);
});

module.exports = router;
