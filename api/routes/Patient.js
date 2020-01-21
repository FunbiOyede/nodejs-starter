const express = require("express");

const Router = express.Router();
// patient signup
Router.post("/signup");
// patient login
Router.post("/login");
// get patient records and appointments
Router.get("/records");
