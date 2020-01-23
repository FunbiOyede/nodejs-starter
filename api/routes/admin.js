const express = require("express");
const AdminService = require("../../services/admin");
const Router = express.Router();

// all patients
Router.get("/patients");

// create patients
Router.post("/patient", async (req, res) => {
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
  return res.json(patient);
});
// get a patient
Router.get("/patient/:id", async (req, res) => {
  const { id } = req.params;
  const patient = await AdminService.GetPatient(id);
  return res.json(patient);
});
// update patient
Router.put("/patient/:id", async (req, res) => {
  const { id } = req.params;
  const patientRecord = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber
  };
  const patient = await AdminService.UpdatePatient(id, patientRecord);
  res.json(patient);
});
// delete patients
Router.delete("/patient/:id", async (req, res) => {
  const { id } = req.params;
  const patient = await AdminService.DeletePatient(id);
  return res.json(patient);
});

module.exports = Router;
