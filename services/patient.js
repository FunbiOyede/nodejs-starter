const PatientModel = require("../models/patient");

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
      const patient = await PatientModel.findById(id);
      return patient;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PatientService;
