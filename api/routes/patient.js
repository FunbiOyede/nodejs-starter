const express = require("express");
const PatientService = require("../../services/patient");
const responseLog = require("../../loaders/logger").responseLogger;
const Router = express.Router();

Router.get("/patient/:id", async (req, res) => {
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
