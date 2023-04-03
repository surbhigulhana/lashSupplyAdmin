var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
  uid: { type: "ObjectId" },

  Pname: {
    type: String,
  },
  UserName: {
    type: String,
  },
  Quantity: {
    type: Number,
  },
  PurchaseDate: {
    type: String,
  },
  TotalAmt: {
    type: String,
  },
  Status: {
    type: String,
    default: "Pending",
  },
  ShipAdd: {
    type: String,
  },
  BillingAdd: {
    type: String,
  },
  Phone:{
    type:String
  },
  AttributeType1:{
    type:String,
  },
  AttributeType2:{
    type:String
  },
  Landmark:{
    type:String
  },
  PostalCode:{
    type:String
  }
});

const Order = new mongoose.model("purchaseOrder", schema3);

module.exports = Order;

// var mongoose = require("mongoose");

// const schema3 = new mongoose.Schema({
//   uid:{type:'ObjectId'},

//  orderNumber:{
//   type:String,
//  },
//   Name: {
//     type: String

//   },
//   UserName:{
//     type:String,

//   },
//   Quantity:{
//     type:Number
//   },
//   imgCollection: {
//     type: String ,
//   }
//   ,
//   TotalAmt: {
//     type: Number

//   },

// AttributeType1:{
//   type:Array,
// },
// AttributeType2:{
//   type:Array
// } ,
//  Status:{
//   type:String,
//  default:"Pending"
// },

// });

// const Order = new mongoose.model("purchaseOrder", schema3);

// module.exports = Order;
