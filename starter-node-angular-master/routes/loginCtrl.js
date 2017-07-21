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
  }else if(loginReq.userId=="question"&&loginReq.pwd=="12345"){
    res.send('/addQuestion');
  }else if(loginReq.userId=="user"&&loginReq.pwd=="12345"){
   res.send('/user');
  }
 }
}
module.exports=loginCtrl;