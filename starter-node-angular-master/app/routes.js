var MongoDBClient = require('mongodb').MongoClient;
var config = require('../config/db');
var loginDAO = require('./models/loginDao');
var loginCtrl=require('../routes/loginCtrl');
var questionCtrl=require('../routes/questionCtrl');
var questionDao=require('./models/questionDao')

var loginDAO = new loginDAO(config.url)
loginDAO.init(function(err, result) {
    if(err){console.log(err)}
    console.log(result)
});

var questionDao=new questionDao(config.url);
var loginCtrl=new loginCtrl(loginDAO);
var questionCtrl=new questionCtrl(questionDao);
module.exports = function(app) {
    app.post('/login',loginCtrl.logMe.bind(loginCtrl))
    app.post('/addQuestions',questionCtrl.addQuestions.bind(questionCtrl))
    app.post('/findQuestions',questionCtrl.findQuestions.bind(questionCtrl))
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
});

};