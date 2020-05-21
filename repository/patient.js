

const Repository = require('./repository')
const model = require('../models/patient');

class PatientRepository extends Repository {
 constructor(){
     super(model);
 }
}


module.exports = new PatientRepository()