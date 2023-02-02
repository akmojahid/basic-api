require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.DB;

const conncetDB = () => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("connection succes!");
  } catch (error) {
    console.log("failed ", error);
    process.exit(1);
  }
};

module.exports = conncetDB;
