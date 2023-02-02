require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//declaration
const app = express();
const PORT = process.env.PORT || 6000;
const uri = process.env.DB;

//DB conections
async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log("Failed: ", error);
  }
}

//mongoose code / user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/user", async (req, res) => {
  await connectDB(uri);
  const reqData = {
    name: req.body.name,
    age: req.body.age,
  };
  const newUser = new User(reqData);
  await newUser.save();
  res.json(await User.find({}));
});

//GET request
app.get("*", (req, res) => {
  res.send("<h1>HELLO DEVELOPER</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
