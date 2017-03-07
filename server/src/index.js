const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const {
  getTrackItems,
  getAuthorProfileAndTrackItems,
} = require('./helpers/author.helpers');

const config = require('../../config/server.env');

require('./polyfills');


const app = express();

const rootDir = path.join(__dirname, '../../');


////////////////////////////////
///////// MIDDLEWARES /////////
/////////////////////////////
app.use(bodyParser.json());

// This middleware serves all static assets, INCLUDING our main index.html,
// when the root route is hit ('/').
app.use(express.static(path.join(rootDir, 'client/dist')));

// In development, our client and server run on separate servers.
// Allow CORS so that the client can request data from the server.
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'development') {
    next();
    return;
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});


///////////////////////////
///////// ROUTES /////////
/////////////////////////
app.get('/track-info', (req, res) => {
  console.log('GOT track info');
  getAuthorProfileAndTrackItems(req.query.searchTerm)
    .then((results) => {
      console.log('results', results);
      return res.json(results);
    });
});

app.post('/track-items', (req, res) => {
  console.log('POST track items');
  const { track, options = {} } = req.body;

  getTrackItems(track, options)
    .then((results) => {
      console.log('results', results);
      return res.json(results);
    });
});

// Redirect all other GET requests to the index route, so that vue-router
// can take over.
app.get('*', (req, res) => {
  const indexHtml = path.join(rootDir, 'client/dist/index.html');
  res.sendFile(indexHtml);
});

///////////////////////////
///////// RUN ////////////
/////////////////////////
app.listen(config.PORT, () => {
  console.log('⚡️  Server listening on port ' + config.PORT + '.');
});
