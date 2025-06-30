const express = require("express");
const uploadImageController = require("./../controllers/image_upload_controller");
const authMiddleWare = require("./../middlewares/auth-middleware");
const adminMiddleWare = require("./../middlewares/admin-middleware");
const uploadImageMiddleware = require("./../middlewares/upload-image-middleware");
const imageRouter = express.Router();
imageRouter
  .route("/upload")
  .post(
    authMiddleWare,
    adminMiddleWare,
    uploadImageMiddleware.single("image"),
    uploadImageController.uploadImageController,
  );
imageRouter.route("/").get(uploadImageController.getImageController);
imageRouter
  .route("/:id")
  .get(uploadImageController.getImageById)
  .delete(authMiddleWare, uploadImageController.deleteImage);
module.exports = imageRouter;
