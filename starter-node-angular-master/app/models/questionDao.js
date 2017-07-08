var MongoDBClient = require('mongodb').MongoClient;
function questionDao(url){
this.url=url;
}
questionDao.prototype={

}
module.exports=questionDao;