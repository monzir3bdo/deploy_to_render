const multer = require("multer");
const path = require("path");
const storage = (request, response, next) => {
  const diskStorage = multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, "/uploads");
    },
    filename: function (request, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });
  next();
};
const filterImage = (request, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(new Error("You can only upload images"), false);
  }
};
module.exports = multer({
  dest: "./uploads",
  // fileFilter: filterImage,
  // limit: {
  //   size: 5 * 1024 * 1024 * 1024,
  // },
});
