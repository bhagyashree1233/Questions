
function questionCtrl(questionDao){
this.questionDao=questionDao;
}
questionCtrl.prototype={
    
 addQuestions:function(req,res){
 var self = this;
var questions=req.body;
self.questionDao.addQuestions(questions,function(err,result){
    if(err){
        console.log(err);
        res.send({done:false,message:'unable to add questions'})
    }else  if(result){
        res.send({done:true,message:'questions added'});
    }else{
        res.send({done:false,message:'unable to add questions'}) 
    }
});
 
 },
editQuestio: function(req,res){
     var self = this;
var questions=req.body;
self.questionDao.editQuestion(questions,function(err,result){
    if(err){}
    
})
},
 editQuestionType:function(req,res){
 var self = this;
var questions=req.body;
console.log(questions)
self.questionDao.editQuestions(questions,function(err,result){
   if(err){
        console.log(err);
        res.send({done:false,message:'unable to add questions'})
    }else  if(result){
        res.send({done:true,message:'questions added'});
    }else{
        res.send({done:false,message:'unable to add questions'}) 
    } 
});
 
 },deleteQuestion:function(req,res){
 var self = this;
var questions=req.body;
console.log('questions');
console.log(questions)
self.questionDao.deleteQuestio(questions,function(err,result){
   // res.send(result);
})
 },
 addQuestionType:function(req,res){
 var self = this;
 var questionType=req.body;
 console.log('QuestionType')
 console.log(questionType.type);
self.questionDao.addQuestionTyp(questionType,function(err,result){
    console.log(result);
    if(err){
        console.log(err);
        res.send({done:false,message:'unable to add questions type'})
    }else  if(result){
        res.send({done:true,message:'questions type added'});
    }else{
        res.send({done:false,message:'unable to add questions type'}) 
    }
});
 
 },
 findQuestionType:function(req,res){
 var self = this;
var questions=req.body;
console.log(questions)
self.questionDao.findAllQuestionTyp(function(err,result){
    if(err){
        res.send({done:false,message:'unable to get Question Type'});
    }else if(result.length==0){
     res.send({done:false,message:'No Records found'})
    }else if(result.length>0){
      res.send({done:true,message:'data found',data:result})   
    }
   
});
 },
 findQuestions:function(req,res){
     var self = this;
     var questionType=req.body;
  self.questionDao.findQuestions(questionType,function(err,result){
    if(err){
        res.send({done:false,message:'unable to get  Question'});
    }else if(result.length==0){
     res.send({done:false,message:'No Records found'})
    }else if(result.length>0){
        console.log(result);
      res.send({done:true,message:'data found',data:result})   
    }
});   
 },findPertTypeQuestion:function(req,res){
      var self = this;
      var questionType=req.body;
      console.log(questionType);
  self.questionDao.findPertTypeQuestn(questionType,function(err,result){
   if(err){
        res.send({done:false,message:'unable to get  Question'});
    }else if(result.length==0){
     res.send({done:false,message:'No Records found'})
    }else if(result.length>0){
        console.log(result);
      res.send({done:true,message:'data found',data:result})   
    }
});  
 }

}
module.exports=questionCtrl;