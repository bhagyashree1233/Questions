var MongoDBClient = require('mongodb').MongoClient;
function loginCtrl(loginDao){
this.loginDao=loginDao;
}
loginCtrl.prototype={
 
 logMe:function(req,res){
 var loginReq=req.body
console.log(loginReq)
  if(loginReq.userId=="admin"&&loginReq.pwd=="12345"){
   res.send('/admin');
  }else if(loginReq.userId=="questions"&&loginReq.pwd=="12345"){
    res.send('/question');
  }else if(loginReq.userId=="user"&&loginReq.pwd=="12345"){
   res.send('/user');
  }
 }
}
module.exports=loginCtrl;