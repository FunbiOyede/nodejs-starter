const express = require("express");
const PatientService = require("../../services/patient");
const { celebrate, Joi, Segments } = require("celebrate");
const responseLog = require("../../loaders/logger").responseLogger;
const Router = express.Router();




Router.post(
  "/auth/register",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      age:Joi.number().required(),
      gender:Joi.string().required(),
      address:Joi.string().required()
     
    })
  }),
  async (req, res, next) => {
    try {
      const adminRecord = await PatientService.SignUp({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        role: "Patient",});
      res.status(201).json({message:'user created', adminRecord});
    } catch (error) {
    res.status(401).json({messae:'User already exists. Please try again.'})
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
      const admin = await PatientService.SignIn({
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

Router.get("/patient-info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await PatientService.getPatient(id);
    res.status(200).json(patient);
  } catch (e) {
    res.status(400).json(e);
    responseLog.error(e);
  }
});

Router.get("/patient/appoinments");

module.exports = Router;
