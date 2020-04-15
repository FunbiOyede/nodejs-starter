const Admin = require("../models/admin");
const PatientModel = require("../models/patient");

const {hash,compare} = require('bcryptjs');
const serverLog = require('../loaders/logger').serverLogger
const mailer = require('./mailer');
/**
 * @class AuthService
 * @description Authenticate admin users
 */
class AuthService {
  constructor() {}

  /**
   *
   * @param {object} admin
   * @description sign admin up
   * @returns  {object} adminRecord
   * @memberof AuthService
   *
   */
  static async SignUp(admin) {
    try {
      if( await Admin.findOne({email:admin.email})){
         throw new Error("User already exists. Please try again.")
      }
      serverLog.info('hashing password.....')
      const hashedPassword = await hash(admin.password,12);
      serverLog.info("creating user record")
      const adminRecord = await Admin.create({
        ...admin,
        password:hashedPassword
      });
      await mailer.sendWelcome()
      return adminRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {email} email address of admin
   * @description log admin in
   * @returns  {object} adminRecord
   * @memberof AuthService
   *
   */
  // email  for now password later
  static async SignIn(user) {
    try {
      const adminRecord = await Admin.findOne({ email:user.email });
      if (!adminRecord) {
        throw new Error("invalid email");
      }
    
      if(compare(user.password,adminRecord.password)){
        return adminRecord;
        
      }
      throw new Error('invalid password')
     
    } catch (error) {
      throw error;
    }
  }


  /**
   * @description fetches all patients
   * @returns {object} patient
   * @memberof AdminService
   */
  static async GetPatients() {
    try {
      const patient = await PatientModel.find();
      return patient;
    } catch (e) {
      responseLog.error(e);
      throw e;
    }
  }


    /**
   * @param {number} id
   * @param {object} patient
   * @description updates a patient by id
   * @returns {object} Patient
   * @memberof AdminService
   *
   */
  static async UpdatePatient(id, patient) {
    try {
      const Patient = await PatientModel.findByIdAndUpdate(id, {
        name: patient.name,
        email: patient.email,
        age: patient.age,
        phoneNumber: patient.phoneNumber
      });
      return { patient: Patient };
    } catch (e) {
      responseLog.error(e);
      throw e;
    }
  }


  /**
   * @param {number} id
   * @description fetchs a patient by id
   * @returns {object} patient
   * @memberof AdminService
   */
  static async GetPatient(id) {
    try {
      const patient = await PatientModel.findById(id);
      return { patient };
    } catch (e) {
      responseLog.error(e);
      throw e;
    }
  }

  /**
   * @param {number} id
   * @description deletes a patient by id
   * @returns {object} patient
   * @memberof AdminService
   */
  static async DeletePatient(id) {
    try {
      const patient = await PatientModel.findByIdAndDelete(id);
      return { patient };
    } catch (e) {
      responseLog.error(e);
      throw e;
    }
  }

}

module.exports = AuthService;
