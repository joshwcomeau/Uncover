const { json, send } = require('micro');
const { mapLimit } = require('async');

const {
  getTrackItems,
  getAuthorProfileAndTrackItems,
} = require('./helpers/author.helpers');
const { getPathnameAndQuery } = require('./helpers/misc.helpers');

module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  // Handle pre-flight requests
  if (req.method === 'OPTIONS') {
    return send(res, 200);
  }

  const { pathname, query } = getPathnameAndQuery(req.url);

  let results;

  switch (pathname) {
    case '/get-track-info': {
      // Given a search term and a category, search Goodreads for the author,
      // and return the author ID and avatar image.
      const { searchTerm, category } = query;

      // TODO: Support things other than authors
      results = await getAuthorProfileAndTrackItems(searchTerm);

      break;
    }

    case '/get-track-items': {
      const { tracks } = await json(req);

      // TODO: Support things other than authors.
      const trackRequests = tracks.map(getTrackItems);

      results = await Promise.all(trackRequests);
      break;
    }
  }

  return results
}
