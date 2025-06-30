const express = require("express");
const authController = require("./../controllers/auth-controller");
const authMiddleware = require("./../middlewares/auth-middleware");
const authRouter = express.Router();
authRouter.route("/login").post(authController.loginController);
authRouter.route("/register").post(authController.registerController);
authRouter
  .route("/change-password")
  .post(authMiddleware, authController.changePassword);
module.exports = authRouter;
