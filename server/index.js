const path = require('path');
const express = require('express');

const {
  getTrackItems,
  getAuthorProfileAndTrackItems,
} = require('./helpers/author.helpers');

const config = require('../config/server.env');


const app = express();

const rootDir = path.join(__dirname, '..');


app.use(express.static('client/dist'));

app.get('/', (req, res) => {
  console.log(rootDir, path.resolve(rootDir, 'dist/index.html'))
  return res.sendFile(path.resolve(rootDir, 'dist/index.html'));
});


app.listen(config.PORT, () => {
  console.log('⚡️  Server listening on port ' + config.PORT + '.');
});
