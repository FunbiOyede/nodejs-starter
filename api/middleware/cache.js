const {client} = require('../../loaders/redis');


const cache = async (req, res, next) => {
    
    const {role} = req.session.admin
     try {
         const data = await client.get(role);
         if (data != null) {
          res.json(data);
        } else {
          next();
        }

     } catch (error) {
         if (error) {
         console.log(error)
        res.status(500).send(error);
      }
     }
  };

  module.exports = cache