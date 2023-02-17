var mongoose = require("mongoose");
const schema3 = new mongoose.Schema({
  Pname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
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
  Price: {
    type: String,
  },
  Qty: {
    type: String,
  },
  TotalPrice: {
    type: String,
  },
  imgCollection: {
    type: String ,
  },
});

const Cart = new mongoose.model("Cart", schema3);

module.exports = Cart;
