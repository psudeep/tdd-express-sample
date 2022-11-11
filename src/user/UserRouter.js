const express = require("express");
const router = express.Router();

const UserService = require("./UserService");

router.post("/api/v1/users", async (req, res) => {
  let payload = req.body;
  await UserService.save(payload);
  return res.send({ message: "user created" });
});

module.exports = router;
