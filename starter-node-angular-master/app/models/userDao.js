var MongoDBClient = require('mongodb').MongoClient;
function userDao(url){
this.url=url;
}
userDao.prototype={
    findAllQuestions:function(callBack){
 var self=this;
 MongoDBClient.connect(self.url, function(err, db) {
if (err){callback(err,null);}else{
    
}
 })
    }
}
module.exports=userDao