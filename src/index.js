const express = require("express");
const mongoose = require("mongoose");
const app = express();
//----------------------------------------

const uri =
  "mongodb+srv://akmojahid:017766512@cluster0.ls8vekp.mongodb.net/products_db";
mongoose.set("strictQuery", false);

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Atlas connection established successfully");
});

connection.on("error", (error) => {
  console.error("MongoDB Atlas connection error: ", error);
});

//user Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// model / collections
const Product = mongoose.model("Products", productSchema);

//--------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//--------------------------------------

app.post("/create", async (req, res) => {
  try {
    const myProduct = new Product({
      title: req.body.title,
      price: req.body.price,
    });
    const productData = await myProduct.save();
    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/products", (req, res) => {
  try {
    Product.find((err, data) => {
      console.log(err);
      res.setHeader("Content-type", "application/json");
      res.send(data);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Express app listening on port 3000");
});
