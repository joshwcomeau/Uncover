const amazon = require('amazon-product-api');

const { AWS_KEY, AWS_SECRET, ASSOCIATE_TAG } = require('../../config/server.env');

const client = amazon.createClient({
  awsId: AWS_KEY,
  awsSecret: AWS_SECRET,
  awsTag: ASSOCIATE_TAG,
});


module.exports.searchAmazon = (metadata, {
  searchIndex = 'Books',
  responseGroup = 'ItemAttributes,Images',
  sort = '-publication_date',
} = {}) => {
  const params = Object.assign({ searchIndex, responseGroup, sort }, metadata);

  // Returns a promise that must be handled by the invoking function.
  return client.itemSearch(params);
}
