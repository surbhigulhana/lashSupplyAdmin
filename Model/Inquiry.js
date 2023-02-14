var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  UserName: {
    type: String,

  },
  
  UserEmail: {
    type: String,

  },
  

  
  Message: {
    type: String,

  }
  
  
 
});

const Inquiry = new mongoose.model("Inquiry", schema3);

module.exports = Inquiry;
