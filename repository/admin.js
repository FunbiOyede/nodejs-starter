
const Repository = require('./repository')
const model = require('../models/admin');
class AdminRepository extends  Repository{
    constructor(){
        super(model)
    }
}

module.exports = new AdminRepository()