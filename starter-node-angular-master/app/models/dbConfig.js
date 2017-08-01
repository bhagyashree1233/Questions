var MongoDBClient = require('mongodb').MongoClient;
var MongoDBUtils = {
    getOrCreateDatabase: function(url, callback) {

            var tabel = function(tabelName) {
             MongoDBClient.connect(url, function(err, db) {
            console.log('Hi am inside client')
            if (err) {
             callback(err, null);
            }else{
                console.log('Hi am inside table')
                db.createCollection(tabelName, function(err, res) {
                    if (err){
                   db.close();     
                  callback(err, null);
                    }else{
                    console.log("Table created!" + tabelName);
                     db.close();
                    callback(null, "created");
                                      } 
                })
            }
           
            });
        }
          tabel("login");
           tabel("questionAndAnswer");
           tabel("admin");
           tabel("questionType");
        
    }
}
module.exports = MongoDBUtils;