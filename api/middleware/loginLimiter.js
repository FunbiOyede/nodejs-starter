const {client} = require('../../loaders/redis');


const sets = async () =>{
    const reply  = await client.set('name','hello');
    console.log(reply)
}

sets()