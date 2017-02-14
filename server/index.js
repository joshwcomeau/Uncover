const { json, send } = require('micro');
const { mapLimit } = require('async');

const { populateAuthorInfo } = require('./helpers/author.helpers');


module.exports = async function(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');

    send(res, 200);
  }

  const { tracks } = await json(req);

  let query;

  // TODO: Support things other than authors.
  const trackRequests = tracks.map(populateAuthorInfo);

  const results = await Promise.all(trackRequests);

  return results
}
