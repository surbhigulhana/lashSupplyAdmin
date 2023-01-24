var mongoose = require("mongoose");
const schema3 = new mongoose.Schema({
  Pname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  filename: {
    type: String ,
  },
  Price: {
    type: String,
  },
});

const wishlist = new mongoose.model("wishlist", schema3);

module.exports = wishlist;
