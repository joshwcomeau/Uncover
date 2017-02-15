const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports.getPathnameAndQuery = (url) => {
  const { pathname, search } = parseUrl(url);
  const query = parseQuery(search.substr(1) || '');

  return { pathname, query };
}
