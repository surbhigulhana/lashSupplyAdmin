var mongoose = require("mongoose");
const schema3 = new mongoose.Schema({

email: {
  type: String,
  required: true,
},
  Pname: {
    type: String,
  },
  imgCollection: {
    type: String ,
  },
  Qty:{
    type:String
  },
  Price: {
    type: String,
  },
});

const wishlist = new mongoose.model("wishlist", schema3);

module.exports = wishlist;
