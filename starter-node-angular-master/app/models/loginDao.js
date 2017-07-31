var MongoDBClient = require('mongodb').MongoClient;
var MongoDBUtils = require('./dbConfig');

function loginDAO(url) {
    this.url = url;
}
loginDAO.prototype = {
    init: function(callback) {
        var self = this;
        MongoDBUtils.getOrCreateDatabase(self.url, function(err, result) {
            if (err) {
                callback(err,null);
            }else{
            callback(null,result);
}
        })
    }
}
module.exports = loginDAO;