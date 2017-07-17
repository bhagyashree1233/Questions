
function questionCtrl(questionDao){
this.questionDao=questionDao;
}
questionCtrl.prototype={
    
 addQuestions:function(req,res){
 var self = this;
var questions=req.body;
console.log(questions)
self.questionDao.addQuestions(questions,function(err,result){
    console.log(result.insertedIds)
});
 
 },editQuestionType:function(req,res){
 var self = this;
var questions=req.body;
console.log(questions)
self.questionDao.editQuestions(questions,function(err,result){
    console.log(result.insertedIds)
});
 
 },deleteQuestion:function(req,res){
 var self = this;
var questions=req.body;
console.log(questions)
self.questionDao.deleteQuestio(questions,function(err,result){
    
})
 },
 addQuestionType:function(req,res){
 var self = this;
 var questionType=req.body;
 console.log('QuestionType')
 console.log(questionType.type);
self.questionDao.addQuestionTyp(questionType,function(err,result){
    console.log(result.insertedIds);
});
 
 },
 findQuestionType:function(req,res){
 var self = this;
var questions=req.body;
console.log(questions)
self.questionDao.findAllQuestionTyp(function(err,result){
    res.send(result);
});
 },
 findQuestions:function(req,res){
     var self = this;
  self.questionDao.findQuestions(function(err,result){
    res.send(result)
});   
 },findPertTypeQuestion:function(req,res){
      var self = this;
      var questionType=req.body;
  self.questionDao.findPertTypeQuestn(questionType,function(err,result){
    res.send(result)
});  
 }

}
module.exports=questionCtrl;