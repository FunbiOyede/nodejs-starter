const mongoose = require("mongoose");

const Patient = new mongoose.Schema({
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
  
  gender: {
    type: String,
    required: true
  },
  
  address: {
    type: String,
    required: true
  },

  role:{
    type:String,
    require:true
  }
});

module.exports = mongoose.model("Patient", Patient);
