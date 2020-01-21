const express = require("express");

const Router = express.Router();
// admin signup
Router.post("/signup");
// admin login
Router.post("/login");
// gets all patients
Router.get("/patients");
// create patients
Router.post("/patients");
// get a patient
Router.get("/patients/:id");
// update patient
Router.put("/patients/:id");
// delete patients
Router.delete("/patients/:id");
