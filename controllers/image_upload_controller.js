const Image = require("./../models/Image");
const uploadImageHelper = require("./../helpers/cloudinaryHelper");
const User = require("./../models/User");
const cloudinary = require("./../config/cloudinary_config");
const uploadImageController = async (request, response) => {
  try {
    console.log(request.file);

    if (!request.file) {
      return response.status(400).json({
        success: false,
        message: "Image is required Please ensure you have upload an image",
      });
    }

    const { url, public_id } = await uploadImageHelper(request.file.path);
    const newImage = await Image.create({
      url,
      publicId: public_id,
      uploadBy: request.user.id,
    });
    response.status(201).json({
      status: true,
      message: "Image Uploaded Successfully",
      data: newImage,
    });
  } catch (e) {
    console.log(e);
    response.status(500).json({
      success: false,
      message: "Something Went Wrong Please try again later",
    });
  }
};
const getImageController = async (request, response) => {
  try {
    const limit = request.query.limit || 0;
    const skip = request.query.skip || 0;
    const sortBy = request.sortBy || "createdAt";
    const sortOrder = request.query.sortOrder === "asc" ? 1 : -1;
    const sortObj = {};
    sortObj[sortBy] = sortOrder;
    const images = await Image.find({}).skip(skip).limit(limit).sort(sortObj);
    response.status(200).json({
      success: true,
      message: "Got All Images Successfully",
      data: images,
    });
  } catch (e) {
    console.log(e);
    response.status(500).json({
      success: false,
      message: "Something Went Wrong Please try again later",
    });
  }
};
const getImageById = async (request, response) => {
  try {
    const id = request.params.id;

    const image = await Image.findById(id);
    if (!image) {
      return response.status(404).json({
        success: false,
        message: "Image Not Found",
      });
    }
    response.status(200).json({
      success: false,
      message: "Get Image Successfully",
      data: image,
    });
  } catch (e) {
    console.log(e);
    response.status(500).json({
      success: false,
      message: `Something went wrong:${e.message}`,
    });
  }
};
const deleteImage = async (request, response) => {
  try {
    const user = await User.findById(request.user.id);
    const imageId = request.params.id;
    const image = await Image.findById(imageId);
    if (!image) {
      return response.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    if (image.uploadBy.toString() !== user.id) {
      return response.status(403).json({
        success: false,
        message: "Unauthorized to delete this image",
      });
    }
    await cloudinary.uploader.destroy(image.publicId);
    await Image.findByIdAndDelete(imageId);
    response.status(200).json({
      success: true,
      message: "Image Deleted Successfully",
    });
  } catch (e) {
    console.log(e);
    response.status(500).json({
      success: false,
      message: `Something went wrong:${e.message}`,
    });
  }
};
module.exports = {
  uploadImageController,
  getImageController,
  getImageById,
  deleteImage,
};
