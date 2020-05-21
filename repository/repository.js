

class Repository{
    constructor(model){
        this.model = model
    }

    create(body){
        const document = new this.model(body)
        return document.save()
    }

    find(query={},fields,multiple=true){
        const paramter = [...fields].join() || null
         const result = multiple ? this.model.find(query) : this.model.findOne(query,paramter)
         return result
    }
    getById(id){
        return this.model.findById(id)

    }
    
}


module.exports = Repository