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
const redisClient = () => client;

module.exports = {
   start,
   client
}