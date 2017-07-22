var MongoDBClient = require('mongodb').MongoClient;

function userDao(url) {
    this.url = url;
}
var userAns = {};
var ansCount = 0;


userDao.prototype = {

    addUserAns: function(userAnswer, callback) {
        userAns = {};
        var userQuestionType = {}
        ansCount = 0;
        userAns.type = userAnswer.type;
        userQuestionType.questionType = userAnswer.type;
        userAns.userId = userAnswer.userId;
        userAns.question = userAnswer.questions.length;
        console.log(userAnswer.questions);


        var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            }
            db.collection("questionAndAnswer").find(userQuestionType, {
                questions: 1,
                _id: 0
            }).toArray(function(err, result) {
                if (err) {
                    callback(err, null)
                }
                console.log('Result')
                console.log(result[0]);
                for (var i = 0; i < userAnswer.questions.length; i++) {

                    if (userAnswer.questions[i].userAnswer == undefined) {
                        console.log('userAnswer Udefined')
                    } else if (result[0].questions[i].rightAnswer == userAnswer.questions[i].userAnswer) {
                        ansCount++
                    }

                }
                userAns.ansCount = ansCount;
                console.log(userAns);
                db.collection("admin").insert(userAns, function(err, result) {
                    if (err) {
                        console.log(err);
                        callback(err, null)
                    }
                    db.close();
                    callback(null, result)
                })
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
                        callback(err, null)
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