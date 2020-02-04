const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
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
// function logAdmins(err, admin) {
//   if (err) {
//     throw err;
//   }
//   console.log(admin);
// }
// later things
// Admin.methods.fetchAllAdmin = function(cb) {
//   return this.model("Admin").find(cb);
// };
module.exports = mongoose.model("Admin", Admin);
