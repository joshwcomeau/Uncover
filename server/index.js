const { json, send } = require('micro');

const { getPathnameAndQuery } = require('./helpers/misc.helpers');
const {
  getTrackItems,
  getAuthorProfileAndTrackItems,
} = require('./helpers/author.helpers');

module.exports = async function run(req, res) {
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
      // Given a search term, search Goodreads for the author,
      // and return the author ID and avatar image.
      const { searchTerm } = query;

      // TODO: Support things other than authors
      results = await getAuthorProfileAndTrackItems(searchTerm);

      break;
    }

    case '/get-track-items': {
      const { track } = await json(req);

      // TODO: Support things other than authors.
      results = await getTrackItems(track);

      break;
    }

    default:
      throw new Error(`Unrecognized pathname: ${pathname}`);
  }

  return results;
};
