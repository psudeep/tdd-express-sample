const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("./User");

router.post("/api/v1/users", async (req, res) => {
  let payload = req.body;
  const hash = await bcrypt.hash(payload.password, 10);
  payload = { ...payload, password: hash };
  // payload = Object.assign({}, payload, { password: hash });
  // payload.password = hash;
  await User.create(payload);
  return res.send({ message: "user created" });
});

module.exports = router;
