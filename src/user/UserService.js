const bcrypt = require("bcrypt");
const User = require("./User");

const save = async (payload) => {
  const hash = await bcrypt.hash(payload.password, 10);
  payload = { ...payload, password: hash };
  // payload = Object.assign({}, payload, { password: hash });
  // payload.password = hash;
  await User.create(payload);
};
module.exports = {
  save,
};
