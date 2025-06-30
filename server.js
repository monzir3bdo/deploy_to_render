require("dotenv").config();
const router = require("./router/router");
const express = require("express");
const app = express();
const connectToDB = require("./database/db");
connectToDB().then(() => {
  console.log("Connected To Database Successfully");
});
//middlewares
app.use(express.json());

app.use("/api/v1", router);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is start on port:${port}`);
});
