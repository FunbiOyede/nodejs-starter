const AdminModel = require("../../models/admin");

// attaching admin
const attachCurentUser = async (req, res, next) => {
  const admin = await AdminModel.findById("5e3898ce7fadd4197853bf6d");
  if (!admin) {
    res.status(401).send();
  }
  req.session.admin = admin;
  return next();
};

module.exports = attachCurentUser;
