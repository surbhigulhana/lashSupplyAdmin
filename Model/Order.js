// var mongoose = require("mongoose");

// const schema3 = new mongoose.Schema({
//   uid:{type:'ObjectId'},
 
//   Pname: {
//     type: String

//   },
//   UserName:{
//     type:String,
 
//   },
//   Phone:{
//     type:String
//   },
//   PurchaseDate:{
//     type:String
//   },
//   TotalAmt:{
//     type:String
//   },
//   Status:{
//     type:String,
//     default:"Pending"
//   },
//   ShipAdd:{
//     type:String
//   },
//   BillingAdd:{
//     type:String
//   },
  

  
  
 
// });

// const Order = new mongoose.model("purchaseOrder", schema3);

// module.exports = Order;

















var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
  uid:{type:'ObjectId'},

 orderNumber:{
  type:String,
 },
  Name: {
    type: String

  },
  UserName:{
    type:String,
 
  },
  Quantity:{
    type:String
  },
  imgCollection: {
    type: String ,
  },


AttributeType1:{
  type:Array,
},
AttributeType2:{
  type:Array
} , Status:{
  type:String,
 default:"Pending"
},
 
});

const Order = new mongoose.model("purchaseOrder", schema3);

module.exports = Order;