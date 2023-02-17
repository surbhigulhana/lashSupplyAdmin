
var mongoose = require("mongoose");
const schema3 = new mongoose.Schema({
  Name: {
    type: String, },
  Desc: {
    type: String,},
  CateName: {
    type: String,
  },
  MinPrice: {
    type: String,
  },
  MaxPrice: {
    type: String,
},
  SkuNo: {
    type: String,
  },



  AttributeName1: {
    type: String,ref:"attribute"
  },
  AttributeName2: {
    type: String,ref:"attribute"
  },
  AttributeType1: {
    type: Array,ref:"attributeType"
  },
  AttributeType2: {
    type: Array,ref:"attributeType"
  },
  Price1: {
    type: String,
  },

// -------------------------------------------------------------------------------
  AttributeName11: {
    type: String,ref:"attribute"
  },
  AttributeName22: {
    type: String,ref:"attribute"
  },
  AttributeType11: {
    type: Array,ref:"attributeType"
  },
  AttributeType22: {
    type: Array,ref:"attributeType"
  },
   Price2: {
    type: String,
  },
  // ----------------------------------------------------------------------------s

  
  imgCollection: {
    type: Array
},
 
  StoreName:{
    type:Array
  }
 
});

const PP = new mongoose.model("PP", schema3);

module.exports = PP;
