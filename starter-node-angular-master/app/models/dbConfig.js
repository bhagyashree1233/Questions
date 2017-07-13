var MongoDBClient = require('mongodb').MongoClient;
var MongoDBUtils = {
    getOrCreateDatabase: function(url, callback) {

        MongoDBClient.connect(url, function(err, db) {
            console.log('Hi am inside client')
            if (err) {
                console.log(err)
            }
            var tabel = function(tabelName) {
                console.log('Hi am inside table')
                db.createCollection(tabelName, function(err, res) {
                    if (err) throw err;
                    console.log("Table created!" + tabelName);
                    callback(null, "created");

                })
            }
            tabel("login");
            tabel("questionAndAnswer");
            tabel("admin");
            tabel("questionType");
        });
    }
}
module.exports = MongoDBUtils;