require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  fs.rename("./test.ts", "test.js");

  res.end();
});

app.listen(port, console.log(`Server in https://localhost:${port}`));

