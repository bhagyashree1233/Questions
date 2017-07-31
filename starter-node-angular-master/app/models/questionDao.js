var MongoDBClient = require('mongodb').MongoClient;

function questionDao(url) {
    this.url = url;
}
questionDao.prototype = {
    addQuestions: function(questions, callback) {
        var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection("questionAndAnswer").insert(questions, function(err, result) {
                    if (err) {
                        console.log(err);
                        callback(err, null)
                    }
                    db.close();
                    console.log(result);
                    callback(null, result)
                })

            }

        })
    },
    addQuestionTyp:function(questionType,callback){
       var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection("questionType").insert(questionType ,function(err, result) {
                    if (err) {
                        console.log(err);
                        callback(err, null)
                    }
                    db.close();
                    console.log(result);
                    callback(null, result)
                })

            }

        })
    },
    findAllQuestionTyp:function(callback){
    var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection("questionType").find({}).toArray(function(err, result) {
                    if (err) {
                        callback(err)
                    }
                    console.log(result);
                    db.close();
                    callback(null, result)
                })
            }
        })
    },
    findQuestions: function(quesType,callback) {
        var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection("questionAndAnswer").find(quesType).toArray(function(err, result) {
                    if (err) {


                        callback(err)
                    }
                    console.log(result);
                    db.close();
                    callback(null, result)



                })
            }
        })
    },editQuestion:function(question,callback){
        var self = this;
        console.log(question);
 MongoDBClient.connect(self.url, function(err, db) {
     if(err){
         console.log(err);
     }
 db.collection("questionAndAnswer").update({questionType:question.questionType,'questions.questions':question.oldquestion},{ $set: {'questions.$.questions':question.questions,'questions.$.options':question.options,'questions.$.rightAnswer':question.rightAnswer}},function(err, result) {
    if(err){
        console.log(err);
    }
}) 
 })
},
    editQuestions: function(question,callback) {
 var self = this;
 var simpleObj={};
 simpleObj.$push={};
 var oldObj={};
 var rigAns={};
 rigAns.$push={};
        MongoDBClient.connect(self.url, function(err, db) {
           simpleObj.$push.questions= question.newQuestions;
           oldObj=question.oldQuestion;
           console.log('SimpleObj');
           console.log(simpleObj);
           //oldObj.questionType=question.oldQuestions.questionType;
            if (err) {
                callback(err, null);
            } else {

                db.collection("questionAndAnswer").update(oldObj,simpleObj,function(err, result) {
                    if (err) {


                        callback(err)
                    }
                    console.log(result);
                    db.close();
                    callback(null, result)
                })
            }
        })
    }
    ,deleteQuestio:function(question,callback){
              var self = this;
              console.log(question)
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection("questionAndAnswer").update({questionType:question.questionType},{'$pull':{questions:question.questions}},function(err, result) {
                    if(err){
                  callback(err, null); 
                }else{
                    console.log(result)
                   callback(null, result);
                      
                  } 
                })
            }})
    }
    
    ,findPertTypeQuestn: function(questionType,callback) {
         var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection("questionAndAnswer").find(questionType,{ "questions.questions":1,"questions.options":1,questionType:1, _id: 0 }).toArray(function(err, result) {
                    if (err) {
                        callback(err,null)
                    }
                    console.log('result');
                    console.log(result);
                    db.close();
                    callback(null, result)
                })
            }
        })
    }
}


module.exports = questionDao;