const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

mongoose // mongo init
  .connect(`${process.env.MONGODB_BASE_URI}`, { useNewUrlParser: true,
                                                user: `${process.env.MONGODB_USER}`,
                                                pass: `${process.env.MONGODB_PASS}`,
                                                dbName: 'runmarc' })
  .then(() => console.log(`Connected to Mongo DB @ ${process.env.MONGODB_BASE_URI}`))
  .catch(err => console.log(err));


app.listen(port, function () {
 console.log(`Express server listening on port ${port}`);
});


// ******************************************************************//
// ******************************  APIs  ****************************//
// ******************************************************************//

// ------------------------  Comments APIs  -------------------------//
const commentRoutes = require('./routes/commentAPI.js');
app.use('/api/comments', commentRoutes);
app.use('/api/captcha', commentRoutes);

// ------------------------  ITRA Profile APIs  -------------------------//
const profileRoutes = require('./routes/profileAPI.js');
app.use('/api/admin/profile', profileRoutes);
