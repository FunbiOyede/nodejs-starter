const AdminModel = require("../../models/admin");

// attaching admin
const attachCurentUser = async (req, res, next) => {
  const admin = await AdminModel.findById("5e37799607ab644af08f4b8f");
  if (!admin) {
    res.status(401).send();
  }
  req.session.admin = admin;
  return next();
};

module.exports = attachCurentUser;
