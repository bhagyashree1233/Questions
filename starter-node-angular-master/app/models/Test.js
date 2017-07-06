var MongoDBClient = require('mongodb').MongoClient;
var MongoDBUtils = require('./db');

function TestDao(url) {
    this.url = url;
}
TestDao.prototype = {
    init: function(callback) {
        var self = this;
        MongoDBUtils.getOrCreateDatabase(self.url, function(err, result) {
            if (err) {
                console.log(err)
                callback(err, "");
            }
            callback(null, result);

        })
    }
}
module.exports = TestDao;