const Admin = require("../models/admin");
const PatientModel = require("../models/patient");
const {PATIENTS_PER_PAGE} = require('../util/constants');
const {hash,compare} = require('bcryptjs');
const serverLog = require('../loaders/logger').serverLogger
const responseLog = require('../loaders/logger').responseLogger
const mailer = require('./mailer');
const repository = require('../repository/admin');
const patientRepository = require('../repository/patient');
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
      if( await repository.find({email:admin.email},false)){
         throw new Error("User already exists. Please try again.")
      }
      serverLog.info('hashing password.....')
      const hashedPassword = await hash(admin.password,12);
      serverLog.info("creating user record")
      const adminRecord = await repository.create({
        ...admin,
        password:hashedPassword
      })
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
      const adminRecord = await  repository.find({ email:user.email },false)
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
  static async getPatients(page,sortOrder) {
    try {
      let SortOrder = sortOrder === 'desc' ? -1 : 1;

      // implementing pagination
      const patients = await patientRepository.find({}).skip((page - 1) * PATIENTS_PER_PAGE).limit(PATIENTS_PER_PAGE).sort({name:SortOrder})
      const total = await PatientModel.countDocuments();
      const hasNextPage = PATIENTS_PER_PAGE * page < total;
      const hasPrevPage = page > 1
      const currentPage = page
      const nextPage = page + 1;
      const prevPage = page - 1
     
      return {patients,total,hasNextPage, hasPrevPage,currentPage,nextPage,prevPage};
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
        
        
        const admin = await repository.find({email:email},false)
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
      const patient = await patientRepository.getById(id);
      return { patient };
    } catch (e) {
      responseLog.error(e);
      throw e;
    }
  }


  static async searchPatient(patientName, sortOrder){
   try {
    let SortOrder = sortOrder === 'desc' ? -1 : 1;
    const patient = await patientRepository.find({name:patientName}).sort({name:SortOrder});
      return {patient}
   } catch (error) {
    responseLog.error(e);
    throw e;
   }
  }

}

module.exports = AdminServices;
