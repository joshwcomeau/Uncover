const request = require('request-promise');
const xmlParser = require('xml2json');

const { GOODREADS_KEY } = require('../../../config/server.env');

module.exports.searchForAuthor = async (searchTerm) => {
  const options = {
    uri: `https://www.goodreads.com/api/author_url/${searchTerm}`,
    qs: {
      key: GOODREADS_KEY,
    },
  };

  const responseXml = await request(options);
  const response = xmlParser.toJson(responseXml, { object: true });

  return response.GoodreadsResponse.author;
}

module.exports.getAuthorInfo = async (authorId) => {
  const options = {
    uri: `https://www.goodreads.com/author/show/${authorId}`,
    qs: {
      key: GOODREADS_KEY,
    },
  };

  const responseXml = await request(options);
  const response = xmlParser.toJson(responseXml, { object: true })

  return response.GoodreadsResponse.author;
}
