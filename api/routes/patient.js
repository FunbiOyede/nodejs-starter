const express = require("express");
const PatientService = require("../../services/patient");
const { celebrate, Joi, Segments } = require("celebrate");
const responseLog = require("../../loaders/logger").responseLogger;
const Router = express.Router();
const isAuth = require('../middleware/attachCurrentUser');




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
      const patient = await PatientService.createPatients({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        role: "Patient"
      });
      req.session.isLoggedIn = true,
      req.session.patient = patient
      // console.log(req.session.patient)
      res.status(201).json({message:'user created', patient});
    } catch (error) {
      console.log(error)
    res.status(401).json({message: error.message})
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
      const patient = await PatientService.login({
        email:req.body.email,
        password:req.body.password
      });
      req.session.isLoggedIn = true,
      req.session.patient = patient
      res.status(200).json({message:'logged in', patient});
    } catch (error) {
     res.status(400).json({message:error.message})
    }
  }
);

Router.get("/patient-info",isAuth, async (req, res) => {
  try {
    const id = req.session.patient._id;
    const patient = await PatientService.getPatient(id);
    res.status(200).json(patient);
  } catch (e) {
    res.status(400).json(e);
    responseLog.error(e);
  }
});



module.exports = Router;
