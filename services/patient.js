const PatientModel = require("../models/patient");
const logger = require("../loaders/logger");

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
      logger.error(e);
      throw e;
    }
  }
}

module.exports = PatientService;
