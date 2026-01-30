const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// ✅ FULL CORS FIX
app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/complaints", complaintRoutes);

// test route
app.get("/", (req, res) => {
  res.send("CivicFix Backend Running");
});

// mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully ✅"))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
