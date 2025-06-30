const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const authMiddleware = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization;
    if (!authorization) {
      return response.status(400).json({
        success: false,
        message: "You must Enter Token",
      });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return response.status(401).json({
        success: false,
        message: "You are not authenticated to access this endpoint",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.user = await User.findById(decodedToken.id);
    next();
  } catch (e) {
    response.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
module.exports = authMiddleware;
