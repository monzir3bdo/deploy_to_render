const bcyrpt = require("bcrypt");
const hashPassword = (password) => {
  const salt = 10;
  return bcyrpt.hashSync(password, salt);
};
module.exports = hashPassword;
