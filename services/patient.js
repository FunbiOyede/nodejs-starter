const PatientModel = require("../models/patient");
const responseLog = require("../loaders/logger").responseLogger;
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
    } catch (e) {
      responseLog.error(e);
      throw e;
    }
  }
}

module.exports = PatientService;
