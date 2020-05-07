
const TokenBucket = require('../../util/TokenBucket');



function limitRequest(max,perSecond){
    const Bucket = new TokenBucket(max,perSecond);
    return function limitRequestMiddleware(req,res,next){
        if(Bucket.removeToken()){
            console.log(Bucket.token)
            next();
        }else{
            res.status(429).send('Rate limit exceeded');
        }
    }
}


module.exports = limitRequest