const express = require("express");
const AdminService = require("../../services/admin");
const Router = express.Router();
const { celebrate, Joi, Segments } = require("celebrate");
const responseLog = require("../../loaders/logger").responseLogger;
const isAuth = require('../middleware/attachCurrentUser');
const isAdmin = require("../middleware/Admin");


Router.post(
  "/auth/register",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      age: Joi.number()
      .integer()
      .required(),
      address:Joi.string().required(),
     
    })
  }),
  async (req, res, next) => {
    try {
      const adminRecord = await AdminService.SignUp({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age:req.body.age,
        address:req.body.address,
        role: "Admin"
      });
      req.session.isLoggedIn = true,
      req.session.admin = admin
      res.status(201).json({message:'user created', adminRecord});
    } catch (error) {

    res.status(401).json({message: error.message})
    responseLog.info(error)
    }
  }
);



Router.post(
  "/auth/login",
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
     res.status(400).json({message:error.message})
     responseLog.info(error)
    }
  }
);

Router.get('/auth/logout',isAuth, (req,res) =>{
  // delete session from database
  req.session.destroy(() =>{
    res.send('logout')
  })
})


// adding additional info for admin
Router.get("/admin-info",isAuth, async (req,res) =>{
  try {
    const email = req.session.admin.email;
    const admin = await AdminService.getAdminInformation(email);
    res.status(200).json({admin});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

Router.get("/patients",isAuth, isAdmin ,async(req,res) =>{
  try {
    const patients = await AdminService.GetPatients()
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({message:error.message})
  }
 
})



module.exports = Router;
