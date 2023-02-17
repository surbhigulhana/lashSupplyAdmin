var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  CateName: {
    type: String,   

  },
  desc:{
    type:String
  },
  filename:{
    type:String
  }
  
});

const Category = new mongoose.model("Category", schema3);

module.exports = Category;