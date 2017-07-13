var MongoDBClient = require('mongodb').MongoClient;

function userDao(url) {
    this.url = url;
}
var ansCount=0;
var userAns={};
userDao.prototype = {
    addUserAns: function(userAnswer, callback) {
        userAns.type=userAnswer.type;
        userAns.userId=userAnswer.userId;
        userAns.question=userAnswer.questions.length;
        console.log(userAnswer.questions.length);
          ansCount=0;      
       for(var i=0;i<userAnswer.questions.length;i++ ){
           if(userAnswer.questions[i].questions[0]!=undefined){
            console.log(userAnswer.questions[i].questions[0].rightAnswer);
          console.log(userAnswer.questions[i].questions[0].rightAnswer);  
        if(userAnswer.questions[i].questions[0].rightAnswer==userAnswer.questions[i].questions[0].userAnswer){
         ansCount++
         userAns.ansCount= ansCount;
     
        }
            }

        }

        var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } 
                db.collection("admin").insert(userAns, function(err, result) {
                    if (err) {
                       console.log(err);
                        callback(err, null)
                    }
                    db.close();
                    callback(null, result)
                })
            
        })
    },
    findAllUserAnswer: function(callback) {
        var self = this;
        console.log('Hi am in dao layer')
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection("admin").find({}).toArray(function(err, result) {
                    if (err) {
                        callback(err,null)
                    }
                    console.log(result);
                    db.close();
                    callback(null, result)
                })
            }
        })
    }
}
module.exports = userDao