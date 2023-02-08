const express = require("express");
const route = require("./all_route/route");
const db = require("./db/db");
const app = express();

//middleware
app.use(db.connectDB);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*", route.error);

// GET route regiseter

app.get("/", route.home);

app.get("/:id", route.findById);

app.put("/:id", route.updateById);

app.delete("/:id", route.deleteById);

//POST Request
app.post("/create", route.createProducts);

//listener
require("dotenv").config();
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log("Server Running on PORT ", PORT);
});
