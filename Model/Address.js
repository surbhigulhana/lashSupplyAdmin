var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  email: {
    type: String,
    unique:true

  },
  BillingAdd:{
    type:String
  },
  ShipAdd:{
    type:String
  }  
  
 
});

const Address = new mongoose.model("Address", schema3);

module.exports = Address;