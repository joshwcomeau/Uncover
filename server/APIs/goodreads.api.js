const request = require('request-promise');
const xmlParser = require('xml2json');

const { GOODREADS_KEY } = require('../../config/server.env');

module.exports.getAuthorInfo = async (authorId) => {
  const options = {
    uri: `https://www.goodreads.com/author/show/${authorId}`,
    qs: {
      key: GOODREADS_KEY,
    },
  };

  const authorXml = await request(options);

  console.log("GOT", authorXml);
  return authorXml;
}
