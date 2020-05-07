

class TokenBucket{

    constructor(capacity,fillPerSecond){
          this.capacity = capacity;
          this.token = capacity;
          setInterval(() =>{
             this.addToken()
          },fillPerSecond)
    }
  
    addToken(){
        if(this.token < this.capacity){
            this.token +=1
        }
    }
  
    removeToken(){
        if(this.token > 0){
            this.token -= 1
        
            return true
        }
       
        return false
        
    }
  }
  
  module.exports = TokenBucket