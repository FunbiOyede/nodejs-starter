const express = require("express");
const AdminService = require("../../services/AdminAuth");
const { celebrate, Joi, Segments } = require("celebrate");
const AttachUser = require("../middleware/attachCurrentUser");
const Router = express.Router();

// register admin
Router.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().required(),
      gender: Joi.string().required(),
      age: Joi.number()
        .integer()
        .required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      dateOfBirth: Joi.string().required(),
      bloodGroup: Joi.string().required()
    })
  }),
  async (req, res) => {
    const adminRecord = {
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      gender: req.body.gender,
      age: req.body.age,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      bloodGroup: req.body.bloodGroup
    };
    try {
      const admin = await AdminService.SignUp(adminRecord);
      res.status(201).json(admin);
    } catch (error) {
      throw error;
    }
  }
);

// logging admin

Router.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required()
    })
  }),
  AttachUser,
  (req, res) => {
    res.send(req.session.admin);
  }
);
// Router.post(
//   "/login",
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       email: Joi.string().required()
//     })
//   }),
//   async (req, res) => {
//     const { email } = req.body;
//     try {
//       const admin = await AdminService.SignIn(email);

//       res.status(200).json(admin);
//     } catch (error) {
//       throw error;
//     }
//   }
// );

module.exports = Router;
