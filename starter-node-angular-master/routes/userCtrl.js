
function userCtrl(userDao){
this.userDao=userDao;
}
userCtrl.prototype={
    
 addAnswers:function(callback){
  var self = this;
var questions=req.body;
console.log(questions)
self.questionDao.addQuestions(questions,function(err,result){
    console.log(result.insertedIds)
});
 
 }
}
module.exports=userCtrl;