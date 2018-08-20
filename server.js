const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('/dist/runmarc'));

app.listen(process.env.PORT || 8080);

//Path Location Strategy
app.get('/*', function(req, res) {
  res.sendFile(path.join('/dist/runmarc/index.html'));
});

console.log('Console Listening');
