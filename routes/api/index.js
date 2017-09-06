var express = require('express');
var apiApp = express();

var messageWorkTogether = require('./message_work_together');

/* GET api index page. */
apiApp.get('/', function(req, res, next) {
  res.render('api_docs');
});

apiApp.use('/message_work_together', messageWorkTogether);

module.exports = apiApp;
