

// attaching admin
const isAdmin = async (req, res, next) => {
  
    if (req.session.admin.role !== 'Admin') {
      
       return res.status(403).send('Forbidden');
    }
    
    return next();
  };
  
  module.exports = isAdmin;
  