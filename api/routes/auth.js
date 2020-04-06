const express = require("express");
const AdminService = require("../../services/AdminAuth");
const { celebrate, Joi, Segments } = require("celebrate");
const AttachUser = require("../middleware/attachCurrentUser");
const AdminModel = require('../../models/admin');
const Router = express.Router();

// register admin
Router.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().required().email(),
      gender: Joi.string().required(),
      age: Joi.number()
        .integer()
        .required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      dateOfBirth: Joi.string().required(),
      bloodGroup: Joi.string().required()
    })
  }),
  async (req, res, next) => {
    try {
      const adminRecord = await AdminService.SignUp({ 
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        bloodGroup: req.body.bloodGroup});
      res.status(201).json({message:'user created', adminRecord});
    } catch (error) {
    res.status(401).json({messae:'User already exists. Please try again.'})
    }
  }
);

// logging admin

// Router.post(
//   "/login",
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       email: Joi.string().required(),
//       password: Joi.string().required()
//     })
//   }),
//   async (req, res) => {
//     const admin = await AdminModel.findOne({email:req.body.email});
//     if (!admin) {
//       res.status(401).send();
//     }
//     req.session.admin = admin;
//     req.session.isLogged = true
//     res.send('logged in')
//   }
// );
Router.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  async (req, res) => {

    try {
      const admin = await AdminService.SignIn({
        email:req.body.email,
        password:req.body.password
      });
      req.session.isLoggedIn = true,
      req.session.admin = admin
      res.status(200).json({message:'logged in', admin});
    } catch (error) {
     res.status(400).json({message:"invalid crendentials"})
    }
  }
);

Router.get('/logout', (req,res) =>{
  // delete session from database
  req.session.destroy(() =>{
    res.send('logout')
  })
})

module.exports = Router;
