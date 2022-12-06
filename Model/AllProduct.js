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
  
  imgCollection: {
    type: Array
},
  Price: {
    type: String,
  },
  StoreName:{
    type:Array
  }
 
});

const ProductData = new mongoose.model("ProductData", schema3);

module.exports = ProductData;
