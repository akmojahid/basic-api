const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      fs.readFile("../demo.text", "utf-8", (err, data) => {
        if (!err) {
          res.write(data);
          res.end();
        } else {
          console.log(err);
        }
      });
    }
  })
  .listen(2000);
