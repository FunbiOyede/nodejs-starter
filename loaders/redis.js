const redis = require('async-redis');
const client = redis.createClient();

const start = () =>{
    client.on('connect',() =>{
        console.log('redis connected')
    })
    
    client.on('error',(err) =>{
        console.log("error",err)
    })
}

module.exports = {
   start,
   client
}