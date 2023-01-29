require("dotenv").config();
const express = require("express");
const app = express();
app.get("/", (req, res) => {});

const PORT = process.env.PORT || 401;
app.listen(PORT, console.log(`https://localhost:${PORT}`));
