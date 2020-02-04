const AdminModel = require("../models/admin");

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
      const adminRecord = await AdminModel.create(admin);
      if (!adminRecord) {
        throw new Error("User cannot be created");
      }
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
  static async SignIn(email) {
    try {
      const adminRecord = await AdminModel.findOne({ email });
      if (!adminRecord) {
        throw new Error("User not registered");
      }
      return adminRecord;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
