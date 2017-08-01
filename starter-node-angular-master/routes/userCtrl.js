
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
    }else  if(result[0]._id!=undefined){
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
    }else if(result.length==0){
      res.send({done:false,message:'No records Found',data:result})   
    }else if(result.length>0){
      res.send({done:true,message:'data found',data:result})  
    }
 });
},
addUser:function(req,res){
 var self = this;
   var user =req.body;
 self.userDao.addUser(user,function(err,result){
     if(err){
        res.send({done:false,message:'unable to get user answer'})
    }else if(result[0]._id!=undefined){
        res.send({done:true,message:'added User'}) 
    }else{
        res.send({done:false,message:'unable to get user answer'}) 
    }
 })
}
}
module.exports=userCtrl;