var MongoDBClient = require('mongodb').MongoClient;
var MongoDBUtils = {
    getOrCreateDatabase: function(url, callback) {
        MongoDBClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log(db);
            db.createCollection("customer", function(err, res) {
                if (err) throw err;
                console.log("Table created!" + "customer");
                callback(null, "created");
                db.close();
            })

        });
    }
}
module.exports = MongoDBUtils;