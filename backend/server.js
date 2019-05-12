const express = require("express");
const https = require('https');  // remove!!!
const request = require('request');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const app = express();
const Comment = require("./models/comment");

var port = process.env.PORT || 3000;
var authenticationTokens = {};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

mongoose
  .connect(`${process.env.MONGODB_BASE_URI}`, { useNewUrlParser: true,
                                                user: `${process.env.MONGODB_USER}`,
                                                pass: `${process.env.MONGODB_PASS}`,
                                                dbName: 'runmarc' })
  .then(() => console.log(`Connected to Mongo DB @ ${process.env.MONGODB_BASE_URI}`))
  .catch(err => console.log(err));

app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'runmarc'}));
});

app.listen(port, function () {
 console.log(`Express server listening on port ${port}`);
});

// ******************************************************************//
// ******************************  APIs  ****************************//
// ******************************************************************//

// ------------------------  Comments APIs  -------------------------//

app.get('/api/comments', function(req, res) {
  Comment.find({display: true})
         .then(data => { res.status(200).send(data) })
         .catch(err => res.send("Something Went Wrong"));
});

app.post('/api/comments', checkAuthentication, function(req, res) {
  var date = req.body.date,
      author = req.body.author,
      email = req.body.email,
      text = req.body.text;

  if(date && author && email && text){
    var comment = Comment({ date: date, author: author, email: email, text: text, display: false });
    comment.save()
           .then(data => res.status(200).send(data))
           .catch(err => res.status(500).send('Unexpected error occurred while storing feedback comment'));
  } else {
    res.status(500).send('Impossible to create a comment, missing required data');
  }
});

app.post('/api/captcha/verify', function(req, res) {
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
            // store captchaResponse for validation
            authenticationTokens[captchaResponse] = new Date().getTime();
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

function checkAuthentication(req, res, next) {
  var token = req.headers['access-token']; // check header for the token

  if (token && authenticationTokens[token]) {
      // console.log('Access token found and authentication validated successfully');
      delete authenticationTokens[token];
      return next();
  } else { // if there is no token
    // console.log('No access token found on the request');
    res.status(401).send({ message: 'No access token provided or found in store' });
  }
};
