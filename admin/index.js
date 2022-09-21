
const express = require("express");
const app = express();
const cors = require("cors");
const path =require("path")
require('./Model/config')
app.use(cors());
app.use(express.json());
// const Driver = require("./config");
const signup =require("./Router/SignupApi")

app.use("/",signup);
  app.use(express.static(path.join(__dirname,"public")));
  
app.listen(4002)
console.log ('server run on 4002')

