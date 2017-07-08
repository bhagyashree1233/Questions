var DB = require('./models/dbConfig');
var config = require('../config/db');
var loginDao = require('./models/loginDao');
var loginCtrl=require('../routes/loginCtrl');
var questionDao=require('./models/questionDao')
var questionDao=new questionDao(config.url);
var loginDao = new loginDao(config.url);
loginDao.init(function(err, result) {
    console.log(result)
});
var loginCtrl=new loginCtrl(loginDao);

module.exports = function(app) {
    app.post('/login',loginCtrl.logMe.bind(loginCtrl))
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};