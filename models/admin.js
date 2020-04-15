const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 8
  },
  
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
 
 address: {
    type: String,
    required: true
  },
  role:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Admin", Admin);
