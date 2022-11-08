
var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  filename: {
    type: String,   

  }
  
});

const BannerImg = new mongoose.model("BannerImg", schema3);

module.exports = BannerImg;