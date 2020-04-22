

// attaching admin
const isAdmin = async (req, res, next) => {
  
    if (req.session.admin.role !== 'Admin') {
        console.log("hfhhebhefb",req.session)
       return res.status(403).send('Access Denied');
    }
    
    return next();
  };
  
  module.exports = isAdmin;
  