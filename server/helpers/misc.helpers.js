const fs = require('fs');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports.getPathnameAndQuery = (url) => {
  const { pathname, search } = parseUrl(url);

  const query = search ? parseQuery(search.substr(1)) : {};

  return { pathname, query };
}

module.exports.readFilePromise = (filename, options) => (
  new Promise((resolve, reject) => {
    fs.readFile(filename, options, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  })
);
