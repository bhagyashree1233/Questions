var MongoDBClient = require('mongodb').MongoClient;
function loginLink(testDao){
this.testDao=testDao;
}
loginLink.prototype={
 
 logMe:function(req,res){
 var loginReq=req.body
console.log(loginReq)
  if(loginReq.userId=="admin"&&loginReq.pwd=="12345"){
   res.sendfile('./public/views/home.html');
  }else if(loginReq.userId=="questions"&&loginReq.pwd=="12345"){
    res.send('/question');
  }else if(loginReq.userId=="user"&&loginReq.pwd=="12345"){
   res.send('/user');
  }
 }
}
module.exports=loginLink;