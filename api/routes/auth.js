const express = require("express");

const Router = express.Router();

// register admin
Router.post("/admin/register");
// log admin
Router.post("/admin/login");
// register patient
Router.post("/patient/register");
// log patient
Router.post("/patient/login");
