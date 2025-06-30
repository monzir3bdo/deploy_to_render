const express = require("express");
const router = express.Router();
const authRouter = require("./auth_routes");
const homeRouter = require("./home_routes");
const imageRouter = require("./image_routes");
router.use("/auth", authRouter);
router.use("/home", homeRouter);
router.use("/images", imageRouter);
module.exports = router;
