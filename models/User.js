const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    max: [100, "Name can not be more than 100 Characters"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    max: [100, "Name can not be more than 100 Characters"],
  },
  password: {
    type: String,
    required: true,
    max: [32, "Password can not be more than 32 Characters Long"],
    min: [8, "Password should be 8 Characters or more"],
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Supervisor"],
    default: "User",
  },
});
module.exports = mongoose.model("User", userSchema);
