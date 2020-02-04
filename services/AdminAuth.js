const AdminModel = require("../models/admin");

class AuthService {
  constructor() {}

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
