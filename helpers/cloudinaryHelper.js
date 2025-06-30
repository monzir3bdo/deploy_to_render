const cloudinary = require("./../config/cloudinary_config");
const uploadImage = async (image) => {
  try {
    console.log(image);
    const result = await cloudinary.uploader.upload(image, {});
    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (e) {
    console.error(`Something went wrong with uploading ${e.message}`);
    throw e;
  }
};
module.exports = uploadImage;
