const express = require('express');
const https = require('https');
const request = require('request');
const dotenv = require('dotenv').config();
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const router = express.Router();

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

// ******************************************************************//
// ******************************  APIs  ****************************//
// ******************************************************************//

router.get('/info', checkAuthCredentials, function(req, res) {
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

router.get('/performance', checkAuthCredentials, function(req, res) {
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

router.get('/statistics', checkAuthCredentials, function(req, res) {
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

module.exports = router;
