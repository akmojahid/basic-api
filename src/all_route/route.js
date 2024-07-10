const db = require("../db/db");
//Error handlr
exports.error = (req, res, next) => {
  if (req.statsCode == 404) {
    res.status(500).json({ msg: "Invalid route: " + req.url });
  } else {
    next();
  }
};

//GET route

exports.home = async (_req, res) => {
  try {
    res.status(200).json({
      succes: true,
      total: await db.Products.countDocuments(),
      data: await db.Products.find().limit(10).select({ _id: 0 }),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).json(await db.Products.findById(id));
  } catch (error) {
    res.status(500).json({ msg: "Something gone wrong", Error: error });
    console.log(error);
  }
};

//POSt Route handlr
exports.createProducts = async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      price: req.body.price,
      details: req.body.details || null,
    };
    const finalProduct = new db.Products(productData);
    const savedProduct = await finalProduct.save();

    //back preview
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error });
    console.dir(error);
  }
};

exports.updateById = async (req, res) => {
  //request body checking
  const id = req.params.id;
  const query = {};

  if (req.body.name) {
    query.name = req.body.name;
  }
  if (req.body.price) {
    query.price = req.body.price;
  }
  if (req.body.details) {
    query.details = req.body.details;
  }

  //Databse operation
  try {
    await db.Products.updateOne({ _id: id }, { $set: query });
    res.status(201).json(await db.Products.findById(id));
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", Error: error });
    console.log(error);
  }
};

exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    await db.Products.deleteOne({ _id: id });
    res.status(200).json({ succes: true, delete: 1, _id: id });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", Error: error });
    console.log(error);
  }
};
