const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.DB;

//module exprots
exports.connectDB = async (req, res, next) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("DB is connected!");
  } catch (error) {
    res.statas(500).json({ msg: "Database conection failed!", erorr: error });
    process.exit(1);
  }
  next();
};

//Products Shcema
const productShcema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  details: String,
});

exports.Products = mongoose.model("Products", productShcema);
