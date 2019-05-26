const express = require("express");
const https = require('https');  // remove!!!
const request = require('request');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const jsdom = require("jsdom");
const nodemailer = require("nodemailer");
const app = express();

const Comment = require("./models/comment");
const { JSDOM } = jsdom;
// nodemailer config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: `${process.env.EMAIL_ACCOUNT_USERNAME}`,
          pass: `${process.env.EMAIL_ACCOUNT_PASSWORD}` } });
// ITRA profile site details
const profileFicheOptions = {
  hostname: 'itra.run',
  path: '/fiche.php',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': `MBLogin=${process.env.ITRA_USERNAME};MBPass=${process.env.ITRA_PASSWORD}`
  }
};

const port = process.env.PORT || 3000;
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

app.post('/api/comments', checkAuthToken, function(req, res) {
  var date = req.body.date,
      author = req.body.author,
      email = req.body.email,
      text = req.body.text;

  if(date && author && email && text) {
    var comment = Comment({ date: date, author: author, email: email, text: text, display: false });
    comment.save()
           .then(data => {
             res.status(200).send(data);
             sendMail(date, author, email, text);
           })
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

// ------------------------  ITRA Profile APIs  -------------------------//

app.get('/api/admin/profile/info', checkAuthCredentials, function(req, res) {
  var querystring = require('querystring'),
      profileInfoOptions = {
        hostname: 'itra.run',
        path: '/community/marc.eiro/572326/25819/',
        method: 'GET'
      },
      callback = function(response) {
        let data = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
          var performanceIndex = _getPerformanceGeneralData(data);
          console.debug("ITRA performance index data retrieved!");
          // console.debug(performanceIndex);
          res.send(performanceIndex);
        });
      };

  _retrieveItraProfileData(profileInfoOptions, callback);
});

app.get('/api/admin/profile/performance', checkAuthCredentials, function(req, res) {
  var querystring = require('querystring'),
      callback = function(response) {
        let data = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
          var performanceData = _getPerformanceDetailedData(data);
          console.debug("ITRA performance data retrieved!");
          // console.debug(performanceData);
          res.send(performanceData);
        });
      },
      postData = querystring.stringify({
        'mode':'getTabRes',
        'nom':'eiro',
        'pnom':'marc',
        'idc':'572326',
        'idm':'25819'
      });

  _retrieveItraProfileData(profileFicheOptions, callback, postData);
});

app.get('/api/admin/profile/statistics', checkAuthCredentials, function(req, res) {
  var querystring = require('querystring'),
      callback = function(response) {
        let data = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
          var worldRankData = _getWorldRankData(data),
              bestPerformancesData = _getBestPerformancesData(data),
              otherData = _getOtherStatisticalData(data);

          var retrievedData = {
            worldRank: worldRankData,
            bestPerformances: bestPerformancesData,
            other: otherData
          };

          console.debug("ITRA statistical data retrieved!");
          // console.debug(retrievedData);
          res.send(retrievedData);
        });
      },
      postData = querystring.stringify({
        'mode':'getTabStat',
        'nom':'eiro',
        'pnom':'marc',
        'idc':'572326',
        'idm':'25819' });

  _retrieveItraProfileData(profileFicheOptions, callback, postData);
});

// ****************************************************************//
// ********************  Private functions  ***********************//
// ****************************************************************//

function checkAuthToken(req, res, next) {
  var token = req.headers['access-token']; // check header for the token

  if (token && authenticationTokens[token]) {
      // console.log('Access token found and authentication validated successfully');
      delete authenticationTokens[token];
      return next();
  } else { // if there is no token
    // console.log('No access token found on the request');
    res.status(401).send({ message: 'Authorization failed' });
  }
};

function checkAuthCredentials(req, res, next) {
  var credentials = req.headers['authorization'];

  if (credentials) {
    let buffer = new Buffer(credentials, 'base64');
    if (buffer.toString('ascii') == `${process.env.API_ADMIN_TOKEN}`) {
      return next();
    }
  }

  res.status(401).send({ message: 'Authentication failed' }); // if there is no token or token is not valid
};

function _retrieveItraProfileData(options, callback, postData) {
  var request = https.request(options, callback);

  request.on('error', (error) => {
    console.log("Error: " + error.message);
    // TODO: consider sending an email to admin to notify
  });

  if(postData) {
    request.write(postData);
  }

  request.end();
}

function _getPerformanceGeneralData(data) {
  var dom = new JSDOM(data),
      window = dom.window,
      content = window.document.getElementsByClassName('mbz ipitra'),
      rows = content[0].getElementsByTagName('tr'),
      results = [];

  for (var i = 1; i < rows.length; i++) {
    var columns = rows[i].getElementsByTagName('td'),
        result = {
              type:             columns[0].textContent.trim(),
              cotationNew:      columns[1].textContent.trim(),
              cotationOld:      columns[2].textContent.trim(),
              menBestCotation:  columns[3].textContent.trim() };

    results.push(result);
  }
  return results;
}

function _getPerformanceDetailedData(data) {
  var fragment = JSDOM.fragment(data),
      profileContent = fragment.getElementById('tabpalm'),
      rows = profileContent.getElementsByTagName('tr'),
      results = [];

  for (var i = 1; i < rows.length; i++) {
    var columns = rows[i].getElementsByTagName('td'),
        j = 0;

    // handle special case when date split into year and (month + day) columns
    if (columns.length % 2 == 0) {
      j++;
    }

    var endurancePoints = '',
        enduranceTd = columns[j + 13].outerHTML;
    if (enduranceTd.indexOf('pts') !== -1) {
      endurancePoints = enduranceTd.substring(enduranceTd.indexOf('pts') + 3, enduranceTd.indexOf('pts') + 4);
    }

    var mountainPoints = '';
    if (columns[j + 14].textContent.trim()) {
      mountainPoints = columns[j + 14].textContent.trim();
    }

    var result = {
          date:             columns[j + 0].getAttribute('title'),
          nameOfRace:       columns[j + 1].textContent.replace(/[\n\r\t]/g, '').trim(),
          distance:         columns[j + 2].textContent.trim(),
          status:           columns[j + 3].textContent.trim(),
          country:          columns[j + 4].textContent.trim(),
          qualifyingRace:   columns[j + 5].textContent.trim(),
          time:             columns[j + 8].textContent.trim(), // skip empty 2 columns
          rank:             columns[j + 9].textContent.trim(),
          rankM:            columns[j + 10].textContent.trim(),
          score:            columns[j + 11].textContent.trim(),
          routeCertified:   columns[j + 12].textContent.trim(),
          endurance:        endurancePoints,
          mountain:         mountainPoints };

    results.push(result);
  }
  // console.debug(results);
  return results;
}

function _getWorldRankData(data) {
  var dom = new JSDOM(data),
      window = dom.window,
      content = window.document.getElementsByClassName('mbz wr'),
      rows = content[0].getElementsByTagName('tr'),
      results = [];

  for (var i = 1; i < rows.length; i++) {
    var columns = rows[i].getElementsByTagName('td'),
        result = {
          category:           columns[0].textContent.trim(),
          performanceIndex:   columns[1].textContent.trim(),
          worldRank:          columns[2].textContent.trim(),
          europeRank:         columns[3].textContent.trim(),
          spainRank:          columns[4].textContent.trim() };
    results.push(result);
  }
  return results;
}

function _getBestPerformancesData(data) {
  var fragment = JSDOM.fragment(data),
      content = fragment.getElementById('tabracepb'),
      rows = content.getElementsByTagName('tr'),
      results = [];

  for (var i = 0; i < rows.length; i++) {
    var columns = rows[i].getElementsByTagName('td'),
        result = {
          category:     columns[0].textContent.trim(),
          date:         columns[1].textContent.trim(),
          nameOfRace:   columns[2].textContent.replace(/[\n\r\t]/g, '').trim(),
          country:      columns[3].textContent.trim(),
          distance:     columns[4].textContent.trim(),
          time:         columns[5].textContent.trim(),
          rank:         columns[6].textContent.trim(),
          rankM:        columns[7].textContent.trim(),
          score:        columns[8].textContent.trim() };
    results.push(result);
  }

  // console.debug(results);
  return results;
}

function _getOtherStatisticalData(data) {
  var fragment = JSDOM.fragment(data),
      content = fragment.getElementById('tabotherstat'),
      rows = content.getElementsByTagName('tr'),
      results = {
        numberOfRaces:          rows[0].textContent.trim(),
        numberOfRacesFinished:  rows[1].textContent.trim(),
        victories:              rows[2].textContent.trim(),
        top3:                   rows[3].textContent.trim(),
        top10:                  rows[4].textContent.trim(),
        kmCovered:              rows[5].textContent.trim(),
        eCovered:               rows[6].textContent.trim() };
  return results;
}

async function sendMail(date, author, email, text) {
  let info = await transporter.sendMail({ // send mail with defined transport object
    from: 'runmarc000@gmail.com',
    to: 'm4rc.3iro@gmail.com',
    subject: 'New feedback comment!',
    html: `New comment from <b>${author}</b> - <b>${email}</b> - at <b>${date}</b><br><br>${text}`
  });  // console.log('Message sent: %s', info.messageId);
}
