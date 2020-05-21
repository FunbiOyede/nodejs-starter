const PatientModel = require("../models/patient");
const {hash,compare} = require('bcryptjs');
const serverLog = require('../loaders/logger').serverLogger
const mailer = require('./mailer');
const responseLog = require("../loaders/logger").responseLogger;
const repository = require('../repository/patient');
/**
 * @description  services for patients
 * @class PatientService
 */
class PatientService {
  /**
   * @param {number} id
   * @description fecth patient data
   * @returns {object} patient
   * @memberof PatientService
   */
  static async getPatient(id) {
    try {
      const patient = await repository.getById(id);
      return patient;
    } catch (e) {
      responseLog.error(e);
      throw e;
    }
  }



  static async createPatients(patient){
    try {
      if( await repository.find({email:patient.email},false)){
        
        throw new Error("User already exists. Please try again.")
     }
     serverLog.info('hashing password.....')
     const hashedPassword = await hash(patient.password,12);
     serverLog.info("creating patient record")
     const patientRecord = await repository.create({
      ...patient,
      password:hashedPassword
    })
     //await mailer.sendWelcome()
     return patientRecord;
    } catch (error) {
      console.log(error)
      throw error;
    }

  }


  /**
   *
   * @param {patient} patient containing the email address of patient
   * @description log patience in
   * @returns  {object} patientRecord
   * @memberof PatientService
   *
   */


  static async login(patient){
    try {
      const patientRecord = await repository.find({ email:patient.email },false);
      if (!patientRecord) {
        throw new Error("invalid email");
      }
    
      if(compare(patient.password,patientRecord.password)){
        return patientRecord;
        
      }
      throw new Error('invalid password')
     
    } catch (error) {
    
      throw error;
    }
  }


}

module.exports = PatientService;
