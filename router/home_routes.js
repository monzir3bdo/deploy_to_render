const { Router, request, response } = require("express");
const authMiddleware = require("./../middlewares/auth-middleware");
const adminMiddleware = require("./../middlewares/admin-middleware");
const homeRouter = Router();
homeRouter
  .route("/")
  .get(authMiddleware, adminMiddleware, (request, response, next) => {
    next();
  });
module.exports = homeRouter;
