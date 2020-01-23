const PatientModel = require("../models/patient");

/**
 * @description Services for CRUD of patients
 * @class AdminService
 */
class AdminService {
  /**
   * @param {object} patient
   * @description creates a new patience
   * @returns {object} patient
   * @memberof AdminService
   */
  static async CreatePatient(patient) {
    try {
      const patientRecord = await new PatientModel({
        name: patient.name,
        email: patient.email,
        gender: patient.gender,
        age: patient.age,
        password: patient.password,
        phoneNumber: patient.phoneNumber,
        dateOfBirth: patient.dateOfBirth,
        bloodGroup: patient.bloodGroup
      });
      const Patient = await patientRecord.save();
      return { patient: Patient };
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AdminService;
