require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = process.env.DB_URL;

//routes
app.post("/user", async (req, res) => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    res.json({ connection: "succes!" });
    res.end();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});

app.get("/", (req, res) => {
  res.json({ msg: "HEllO DEVELOPER" });
});

//listen\
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server on https:localhost:${PORT}`));
