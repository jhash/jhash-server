var express = require('express');
var router = express.Router();

var messageWorkTogether = require('./message_work_together');

/* GET api index page. */
router.get('/', function(req, res, next) {
  res.render('api_docs');
});

router.use('/message_work_together', messageWorkTogether);

module.exports = router;
