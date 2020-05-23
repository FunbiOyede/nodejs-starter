

class Repository{
    constructor(model){
        this.model = model
    }

    create(body){
        const document = new this.model(body)
        return document.save()
    }

    find(query={},multiple=true){
         const result = multiple ? this.model.find(query) : this.model.findOne(query)
         return result
    }
    getById(id){
        return this.model.findById(id)

    }
    deleteAll(){
        return this.model.remove({},()=>{})
     }
    
}


module.exports = Repository