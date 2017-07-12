var MongoDBClient = require('mongodb').MongoClient;

function userDao(url) {
    this.url = url;
}
userDao.prototype = {
    addUserAns: function(userAnswer, callback) {
        var self = this;
        MongoDBClient.connect(self.url, function(err, db) {
            if (err) {
                callback(err, null);
            } 
                db.collection("admin").insert(userAnswer, function(err, result) {
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