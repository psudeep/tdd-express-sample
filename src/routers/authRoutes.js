const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/signup/", authController.signUp, async (req, res) =>
  res.status(200).json({ Username: res.locals.Username })
);
