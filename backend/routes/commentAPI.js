const express = require('express');
const router = express.Router();
const https = require('https');
const request = require('request');
const Comment = require("../models/comment");
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");

// nodemailer init config
const transporter = nodemailer.createTransport({
  service: `${process.env.EMAIL_PROVIDER}`,
  auth: { user: `${process.env.EMAIL_ACCOUNT_USERNAME}`,
          pass: `${process.env.EMAIL_ACCOUNT_PASSWORD}` } });

// store auth tokens to secure comments api
var authenticationTokens = {};

// ******************************************************************//
// ******************************  APIs  ****************************//
// ******************************************************************//

router.get('/', function(req, res) {
  var type = req.query.type;
  Comment.find({display: true, type: type})
         .then(data => { res.status(200).send(data) })
         .catch(err => res.send("Something Went Wrong"));
});

router.post('/', checkAuthToken, function(req, res) {
  var type = req.body.type,
      date = req.body.date,
      author = req.body.author,
      email = req.body.email,
      text = req.body.text,
      display = req.body.display,
      blogPostId = req.body.blogPostId;

  if(date && author && email && text) {
    var comment = Comment({ type: type, date: date, author: author, email: email, text: text, display: display, blogPostId: blogPostId });
    comment.save()
           .then(data => {
             res.status(200).send(data);
             sendMail(type, date, author, email, text);
           })
           .catch(err => res.status(500).send('Unexpected error occurred while storing feedback comment'));
  } else {
    res.status(500).send('Impossible to create a comment, missing required data');
  }
});

router.post('/verify', function(req, res) {
  var captchaResponse = req.body.captchaResponse,
      payload = `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captchaResponse}`,
      options = { hostname: 'www.google.com',
                  path: '/recaptcha/api/siteverify',
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }},

      callback = function(response) {
        let body = '';
        response.on('data', (chunk) => { body += chunk; });
        response.on('end', () => {
          let googleResponse = JSON.parse(body);

          if (googleResponse.success == true) {
            storeAndCleanupAuthTokens(captchaResponse); // store captchaResponse for future validation
            res.send(googleResponse);
          } else {
            res.status(500).send(googleResponse);
          }
        });
      };

  // verify captcha with Google API
  var request = https.request(options, callback);
  request.on('error', (error) => {
    console.log("Error: " + error.message);
    res.status(500).send(error.message);
  });
  request.write(payload);
  request.end();
});

// ****************************************************************//
// ********************  Private functions  ***********************//
// ****************************************************************//

function checkAuthToken(req, res, next) {
  var token = req.headers['access-token']; // check header for the token

  if (token && authenticationTokens[token]) { // check for token on store
      delete authenticationTokens[token];
      return next();
  } else { // if there is no token
    res.status(401).send({ message: 'Authorization failed' });
  }
};

function storeAndCleanupAuthTokens(token) {
  authenticationTokens[token] = new Date().getTime(); // store
  for (var key in authenticationTokens) { // cleanup; prevents old orphan tokens to stay alive forever
    if (authenticationTokens[key] < new Date().getTime() - 1800000) { // date older than 30 min
      delete authenticationTokens[key];
    }
  }
}

async function sendMail(type, date, author, email, text) {
  let commentType = (type == 0) ? 'Feedback' : 'Blogpost';
  let info = await transporter.sendMail({ // send mail with defined transport object
    from: 'admin@runmarc.com',
    to: 'm4rc.3iro@gmail.com',
    subject: `New ${commentType} comment!`,
    html: `New ${commentType} comment from <b>${author}</b> - <b>${email}</b> - at ${date}<br><br>${text}`
  });  // console.log('Message sent: %s', info.messageId);
}

module.exports = router;
