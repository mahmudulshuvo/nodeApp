var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let data = [
  {
    name: "A"
  },
  {
    name: "B"
  },
  {
    name: "C"
  }
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "My express app",
    data: data
  });
});

app.listen(3000, () => {
  console.log("Server started at port 3000...");
});
