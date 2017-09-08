var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
// TODO: move this somewhere?
AWS.config.update({ region: 'us-east-1' });

var sourceEmail = process.env.JAKE_HASH_SOURCE_EMAIL;

/* POST a work together message. */
router.post('/', function(req, res, next) {
  // TODO: validate name, email, and message

  var ses = new AWS.SES();

  var emailParams = {
    Destination: { /* required */
      BccAddresses: [
        // 'STRING_VALUE',
        /* more items */
      ],
      CcAddresses: [
        // 'STRING_VALUE',
        /* more items */
      ],
      ToAddresses: [
        sourceEmail
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Data: req.body.message /* required */
          // Charset: 'STRING_VALUE'
        },
        Text: {
          Data: req.body.message /* required */
          // Charset: 'STRING_VALUE'
        }
      },
      Subject: { /* required */
        Data: 'Message from ' + req.body.name + ' [JakeHash:Message:WorkTogether' + (process.env.NODE_ENV === 'development' ? ':Development]' : ']') /* required */
        // Charset: 'STRING_VALUE'
      }
    },
    Source: sourceEmail, /* required */
    // ConfigurationSetName: 'STRING_VALUE',
    ReplyToAddresses: [
      req.body.email
    ],
    // ReturnPath: 'STRING_VALUE',
    // ReturnPathArn: 'STRING_VALUE',
    // SourceArn: 'STRING_VALUE',
    Tags: [
      // {
      //   Name: 'STRING_VALUE', /* required */
      //   Value: 'STRING_VALUE' /* required */
      // },
    ]
  };

  ses.sendEmail(emailParams, function(err, data) {
    if (err) throw err;
    else {
      res.json({
        data: {
          message: 'Message sent successfully'
        }
      });
    }
  });
});

module.exports = router;
