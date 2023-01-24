
var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  Name: {
    type: String,   

  }
  
});

const StoreName = new mongoose.model("StoreName", schema3);

module.exports = StoreName;