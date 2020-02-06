const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Admin = require("./models/Admin");
const bcrypt = require("bcrypt");
/*
mongoose.connect("mongodb://localhost:4000/saledadmin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get("/signup", (req, res) => {
  console.log(req.body);

  res.send("its fine for now");
});

server.listen(3030);
