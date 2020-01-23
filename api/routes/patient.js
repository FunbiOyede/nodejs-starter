const express = require("express");
const PatientService = require("../../services/patient");
const Router = express.Router();

Router.get("/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await PatientService.getPatient(id);
    res.json(patient);
  } catch (error) {
    res.status(400).json("🔥 error: %o", error);
  }
});

Router.get("/patient/appoinments");

module.exports = Router;
