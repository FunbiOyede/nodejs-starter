const {client} = require('../../loaders/redis');



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @description caches data
 */
const cache = async (req, res, next) => {
    
    const {role} = req.session.admin
     try {
         const data = await client.get(role);
         if (data != null) {
          res.json(JSON.parse(data));
        } else {
          next();
        }

     } catch (error) {
         if (error) {
        res.status(500).json(error);
      }
     }
  };

  module.exports = cache