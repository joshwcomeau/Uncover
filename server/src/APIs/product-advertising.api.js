const amazon = require('amazon-product-api');

const { AWS_KEY, AWS_SECRET, ASSOCIATE_TAG } = require('../../../config/server.env');

const client = amazon.createClient({
  awsId: AWS_KEY,
  awsSecret: AWS_SECRET,
  awsTag: ASSOCIATE_TAG,
});

module.exports.getBindingFromMediaTypes = (mediaTypes) => {
  let bindings = [];

  if (mediaTypes.includes('print')) {
    bindings.push('hardcover', 'paperback');
  }

  if (mediaTypes.includes('ebook')) {
    bindings.push('kindle');
  }

  if (mediaTypes.includes('audiobook')) {
    bindings.push('audible');
  }

  return bindings;
};

module.exports.createPowerString = power => (
  Object.keys(power)
    .map(powerKey => {
      let powerVal = power[powerKey];

      if (Array.isArray(powerVal)) {
        powerVal = '(' + powerVal.join(' or ') + ')';
      }

      return `${powerKey}:${powerVal}`;
    })
    .join(' and ')
);

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
