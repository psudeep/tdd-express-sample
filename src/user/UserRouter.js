const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("./User");

router.post("/api/v1/users", (req, res) => {
  let payload = req.body;
  bcrypt.hash(payload.password, 10).then((hash) => {
    // console.log("body", payload);
    payload = { ...payload, password: hash };
    // payload = Object.assign({}, payload, { password: hash });
    // payload.password = hash;
    User.create(payload).then(() => {
      return res.send({ message: "user created" });
    });
  });
});

module.exports = router;
