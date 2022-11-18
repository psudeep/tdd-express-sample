const bcrypt = require("bcrypt");

const saltRounds = 10;

const signup = async (payload) => {
  const hash = await bcrypt.hash(payload.password, saltRounds);
  payload = { ...payload, password: hash };
};

module.exports = {
  signup,
};
