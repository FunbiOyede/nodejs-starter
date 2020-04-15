

// attaching admin
const isAuth = async (req, res, next) => {
  
  if (!req.session.isLoggedIn) {
     return res.status(401).send('unauthorized, please login');
  }
  
  return next();
};

module.exports = isAuth;
