const Admin = require("../models/admin");
const PatientModel = require("../models/patient");
const {PATIENTS_PER_PAGE} = require('../util/constants');
const {hash,compare} = require('bcryptjs');
const serverLog = require('../loaders/logger').serverLogger
const responseLog = require('../loaders/logger').responseLogger
const mailer = require('./mailer');
/**
 * @class AuthService
 * @description Authenticate admin users
 */
class AdminServices {
  constructor() {}

  /**
   *
   * @param {object} admin
   * @description sign admin up
   * @returns  {object} adminRecord
   * @memberof AdminServices
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
   * @param {email} email  containing the email address of admin
   * @description log admin in
   * @returns  {object} adminRecord
   * @memberof AdminServices
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
   * @param {Number} number of page
   * @returns {object} patient
   * @memberof AdminService
   */
  static async getPatients(page) {
    try {
      // implementing pagination
      const patients = await PatientModel.find({},'name age gender').skip((page - 1) * PATIENTS_PER_PAGE).limit(PATIENTS_PER_PAGE)
      const NumberOfPatients = await PatientModel.countDocuments();
      const hasNextPage = PATIENTS_PER_PAGE * page < NumberOfPatients;
      const hasPrevPage = page > 1
      const currentPage = page
      const nextPage = page + 1;
      const prevPage = page - 1
      // const pagesNavigation = {
      //   next:PATIENTS_PER_PAGE * page < NumberOfPatients,
      //   prev:page > 1
      // }

      return {patients,NumberOfPatients,hasNextPage, hasPrevPage,currentPage,nextPage,prevPage};
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



  /***
   * 
   * @param{string} email
   * @description gets admin information
   * @returns admin
   */
    static async getAdminInformation(email){
      try {
        
        const admin = await Admin.findOne({email:email}, 'name email age address');
        if(!admin){
          throw new Error("User not found");

        }
        return admin
      } catch (error) {
        throw error
      }
    }
  /**
   * @param {number} id
   * @description fetchs a patient by id
   * @returns {object} patient
   * @memberof AdminService
   */
  static async getPatient(id) {
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

  static async searchPatient(patientName){
   try {
     const patient = await PatientModel.findOne({name:patientName}, 'name email age address');
      return {patient}
   } catch (error) {
    responseLog.error(e);
    throw e;
   }
  }

}

module.exports = AdminServices;
