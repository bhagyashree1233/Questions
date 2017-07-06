var DB = require('./models/db');
var config = require('../config/db');
var TestDao = require('./models/Test');
var testDao = new TestDao(config.url);
testDao.init(function(err, result) {
    console.log(result)
});

module.exports = function(app) {
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};