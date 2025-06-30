const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const hashPassword = require("./../utils/hash_password");
const registerController = async (request, response) => {
  try {
    const { email, username, password, role } = request.body;
    const hashedPassword = hashPassword(password);
    console.log(hashedPassword);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      role,
    });
    response.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (e) {
    console.log(e.message);
    response.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const loginController = async (request, response) => {
  try {
    const { username, password } = request.body;
    console.log(username);
    const user = await User.findOne({ username });
    console.log(user);
    console.log(user.password);
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!user || !checkPassword) {
      return response.status(400).json({
        success: false,
        message: "Check Username or Password",
      });
    }
    const userData = await User.findById(user.id).select("-password");
    const accessToken = jwt.sign(
      {
        username: userData.username,
        id: userData.id,
        role: userData.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3 days",
      },
    );
    response.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: accessToken,
    });
  } catch (e) {
    response.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
const changePassword = async (request, response) => {
  const { oldPassword, newPassword } = request.body;
  const user = await User.findById(request.user.id);
  console.log(user);
  const isOldPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
  if (!isOldPasswordCorrect) {
    return response.status(400).json({
      success: false,
      message: "Please Verify Your Password first",
    });
  }
  if (oldPassword === newPassword) {
    return response.status(400).json({
      success: false,
      message: "New Password must be different from old password",
    });
  }
  const updatedPassword = hashPassword(newPassword);
  console.log(updatedPassword);
  await User.findByIdAndUpdate(
    user.id,
    { password: updatedPassword },
    { new: true },
  );
  return response.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
};
module.exports = {
  registerController,
  loginController,
  changePassword,
};
