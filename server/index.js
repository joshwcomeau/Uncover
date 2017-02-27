const fs = require('fs');
const { json, send } = require('micro');

const {
  getPathnameAndQuery,
  readFilePromise,
} = require('./helpers/misc.helpers');
const {
  getTrackItems,
  getAuthorProfileAndTrackItems,
} = require('./helpers/author.helpers');

// NOTE: We're using the sync method here because it only runs during
// server init, not on every request.
const fsOptions = { encoding: 'utf8' };
const indexHtml = fs.readFileSync('./dist/index.html', fsOptions);

console.log({ indexHtml });

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
      const { track, options = {} } = await json(req);

      // TODO: Support things other than authors.
      results = await getTrackItems(track, options);

      break;
    }

    default:
      // This is a makeshift router.
      // Honestly, I should probably ditch this file and go with a
      // traditional Express setup, since I'm not actually using this as
      // a microservice.
      if (pathname.match(/^\/static\//)) {
        const filePath = `./dist${pathname}`;
        const file = await readFilePromise(filePath, fsOptions);

        return file;
      }

      return indexHtml;
  }

  return results;
};
