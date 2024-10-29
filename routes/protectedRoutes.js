const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

router.get("/exchange-token", verifyToken, (req, res) => {
  res.json({ ...req.user });
});

module.exports = router;
