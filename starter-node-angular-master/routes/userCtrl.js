
function userCtrl(userDao){
this.userDao=userDao;
}
userCtrl.prototype={
    
 addUserAnswers:function(req,res){
  var self = this;
var userAnswer=req.body;
self.userDao.addUserAns(userAnswer,function(err,result){
    console.log(result.insertedIds)
});
 
 },
 findAllUserAnswers:function(req,res){
 var self = this;
 console.log('Hi have entered controller')
 self.userDao.findAllUserAnswer(function(err,result){
      console.log(result)
      res.send(result)
 });
 }
}
module.exports=userCtrl;