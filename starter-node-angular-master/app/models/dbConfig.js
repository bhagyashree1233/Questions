var MongoDBClient = require('mongodb').MongoClient;
var MongoDBUtils = {
    getOrCreateDatabase: function(url, callback) {
        MongoDBClient.connect(url, function(err, db) {
            if (err) throw err;
          
            tabel=function(tabelName){
            db.createCollection(tabelName, function(err, res) {
                if (err) throw err;
                console.log("Table created!" + tabelName);
                callback(null, "created");
                
            })
}
tabel("login");
tabel("questionAndAnswer");
tabel("admin");

        });
    }
}
module.exports = MongoDBUtils;