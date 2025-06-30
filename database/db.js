const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://monzir3bdo:${process.env.DATABASE_PASSWORD}@cluster0.xkgi5f2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    );
  } catch (e) {
    process.exit(1);
    console.log(e);
  }
};
module.exports = connectToDB;
