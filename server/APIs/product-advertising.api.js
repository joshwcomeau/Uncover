const amazon = require('amazon-product-api');

const { AWS_KEY, AWS_SECRET, ASSOCIATE_TAG } = require('../../config/server.env');

const client = amazon.createClient({
  awsId: AWS_KEY,
  awsSecret: AWS_SECRET,
  awsTag: ASSOCIATE_TAG,
});


module.exports.searchAmazon = (metadata, options = {}, retries = 4) => {
  const searchIndex = options.searchIndex || 'Books';
  const responseGroup = options.responseGroup || 'ItemAttributes,Images';
  const sort = options.sort || '-publication_date';

  const params = Object.assign({ searchIndex, responseGroup, sort }, metadata);

  // Returns a promise that must be handled by the invoking function.
  return client.itemSearch(params)
    .catch(err => {
      // Sometimes, amazon's API randomly returns ENOTFOUND.
      // Retry up to 4 times.
      console.error('Could not fetch items from amazon', err);

      if (retries > 0) {
        return module.exports.searchAmazon(metadata, options, retries - 1);
      }
    });
}
