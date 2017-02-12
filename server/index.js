const { json } = require('micro');

const {
  searchAmazon,
  getBindingFromMediaTypes,
  pluckBooksFromResponse,
} = require('./helpers/product-advertising-api');


module.exports = async function(req, res) {
  const { searchTerm, category, metadata } = await json(req);

  let query;

  // For now, only authors are supported.
  switch (category) {
    case 'author': {
      query = {
        author: searchTerm,
        power: getBindingFromMediaTypes(metadata.mediaTypes),
      };

      break;
    }

    default:
      throw new Error('Unrecognized category')
  }

  console.log("Searching", query)

  const result = await searchAmazon(query);

  const relevantBooks = pluckBooksFromResponse(searchTerm, result);

  console.log('Got results', relevantBooks)

  return relevantBooks;
}
