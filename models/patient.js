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
    unique: true,
    trim: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Patient", Patient);
