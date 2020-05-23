

// attaching admin
const isAdmin = async (req, res, next) => {
  
    if (req.session.admin.role !== 'Admin' && req.session.admin.role === undefined) {
      
       return res.status(403).send('Forbidden');
    }
    
    return next();
  };
  
  module.exports = isAdmin;
  