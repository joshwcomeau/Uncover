const amazon = require('amazon-product-api');
const { get, countBy, max, values, findKey } = require('lodash');

const { AWS_KEY, AWS_SECRET, ASSOCIATE_TAG } = require('../../config/server.env');

const client = amazon.createClient({
  awsId: AWS_KEY,
  awsSecret: AWS_SECRET,
  awsTag: ASSOCIATE_TAG,
});


module.exports.searchAmazon = (metadata, searchIndex, responseGroup) => {
  if (typeof searchIndex === 'undefined') {
    searchIndex = 'Books';
  }

  if (typeof responseGroup === 'undefined') {
    responseGroup = 'Images,ItemAttributes';
  }

  const params = Object.assign({ searchIndex, responseGroup }, metadata);

  // Returns a promise that must be handled by the invoking function.
  return client.itemSearch(params);
}

module.exports.getBindingFromMediaTypes = (mediaTypes) => {
  let bindings = [];

  if (mediaTypes.print) {
    bindings.push('hardcover', 'paperback');
  }

  if (mediaTypes.ebook) {
    bindings.push('kindle');
  }

  if (mediaTypes.audiobook) {
    bindings.push('audible');
  }

  const bindingValue = bindings.join(' or ');

  return `binding:${bindingValue}`;
}

module.exports.pluckBooksFromResponse = (searchTerm, result) => {
  const books = result
    .map(book => {
      const id = get(book, 'ASIN[0]');
      const author = get(book, 'ItemAttributes[0].Author[0]');
      const title = get(book, 'ItemAttributes[0].Title[0]');
      const image = get(book, 'LargeImage[0].URL[0]');

      if (!author || !title || !image) {
        return null;
      }

      return { id, author, title, image };
    })
    .filter(book => !!book);

  // If the supplied author name is a perfect match for any of the authors,
  // take that one. Sometimes the most popular author is wrong!
  const perfectMatchBook = books.find(book => (
    book.author.toLowerCase() === searchTerm.toLowerCase()
  ));

  let author;

  if (perfectMatchBook) {
    author = perfectMatchBook.author;
  } else {
    // If no perfect match was found, the most likely author is the one
    // with the most results. Let's trust Amazon's relevancy for this.
    const authorsByCount = countBy(books, 'author');
    const maxRepeated = max(values(authorsByCount));

    author = findKey(authorsByCount, count => count === maxRepeated);
  }

  return books.filter(book => book.author === author);
};
