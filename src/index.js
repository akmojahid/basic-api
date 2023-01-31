require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = process.env.DB_URL;

//routes
app.post("/user", async (req, res) => {
  mongoose
    .connect(uri)
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));
  res.end();
});

app.get("/", (req, res) => {
  res.json({ msg: "HEllO DEVELOPER" });
});

//listen\
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`https:localhost:${PORT}`));
