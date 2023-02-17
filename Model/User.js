
var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
    imgCollection: {
        type: Array
    }
  
});

const User = new mongoose.model("User", schema3);

module.exports = User;