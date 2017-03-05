const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const {
  getTrackItems,
  getAuthorProfileAndTrackItems,
} = require('./helpers/author.helpers');

const config = require('../config/server.env');


const app = express();

const rootDir = path.join(__dirname, '..');


////////////////////////////////
///////// MIDDLEWARES /////////
/////////////////////////////
app.use(bodyParser.json());

// This middleware serves all static assets, INCLUDING our main index.html,
// when the root route is hit ('/').
app.use(express.static('client/dist'));


///////////////////////////
///////// ROUTES /////////
/////////////////////////
app.get('/track-info', (req, res) => {
  getAuthorProfileAndTrackItems(req.query.searchTerm)
    .then((results) => {
      return res.json(results);
    });
});

app.post('/track-items', (req, res) => {
  const { track, options = {} } = req.body;

  getTrackItems(track, options)
    .then((results) => {
      return res.json(results);
    });
});


///////////////////////////
///////// RUN ////////////
/////////////////////////
app.listen(config.PORT, () => {
  console.log('⚡️  Server listening on port ' + config.PORT + '.');
});
