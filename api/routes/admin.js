const express = require("express");
const AdminService = require("../../services/admin");
const Router = express.Router();
const responseLog = require("../../loaders/logger").responseLogger;
// all patients
Router.get("/patients", async (req, res) => {
  try {
    const patients = await AdminService.GetPatients();
    res.json(patients);
  } catch (e) {
    res.status(400).json(e);
    responseLog.error(e);
  }
});

// create patient
Router.post("/patient", async (req, res) => {
  try {
    const patientRecord = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      age: req.body.age,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      bloodGroup: req.body.bloodGroup
    };
    const patient = await AdminService.CreatePatient(patientRecord);
    res.status(201).json(patient);
  } catch (e) {
    res.status(400).json(e);
    responseLog.error(e);
  }
});
// get a patient
Router.get("/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await AdminService.GetPatient(id);
    res.status(200).json(patient);
  } catch (e) {
    res.status(400).json(e);
    responseLog.error(e);
  }
});
// update patient
Router.put("/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patientRecord = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber
    };
    const patient = await AdminService.UpdatePatient(id, patientRecord);
    res.status(201).json(patient);
  } catch (e) {
    res.status(400).json(e);
    responseLog.error(e);
  }
});
// delete patient
Router.delete("/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await AdminService.DeletePatient(id);
    res.status(200).json(patient);
  } catch (e) {
    res.status(400).json(e);
    responseLog.error(e);
  }
});

module.exports = Router;
