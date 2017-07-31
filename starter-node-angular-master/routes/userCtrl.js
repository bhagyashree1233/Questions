
function userCtrl(userDao){
this.userDao=userDao;
}
userCtrl.prototype={
    
 addUserAnswers:function(req,res){
  var self = this;
var userAnswer=req.body;
self.userDao.addUserAns(userAnswer,function(err,result){
   if(err){
        console.log(err);
        res.send({done:false,message:'unable to add user'})
    }else  if(result){
        res.send({done:true,message:'Added User Answers'});
    }else{
        res.send({done:false,message:'unable to add User Answers'}) 
    }
});
 
 },
 findAllUserAnswers:function(req,res){
 var self = this;
 console.log('Hi have entered controller')
 self.userDao.findAllUserAnswer(function(err,result){
     if(err){
        res.send({done:false,message:'unable to get user answer'})
    }else{
      res.send({done:true,message:'data found',data:result})   
    }
 });
 }
}
module.exports=userCtrl;