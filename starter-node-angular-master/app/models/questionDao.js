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
    findQuestions: function(callback) {
        var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection("questionAndAnswer").find({}).toArray(function(err, result) {
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
}


module.exports = questionDao;