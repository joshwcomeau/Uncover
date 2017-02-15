const { get, countBy, max, values, findKey } = require('lodash');

const { searchAmazon } = require('../APIs/product-advertising.api');
const { getAuthorInfo } = require('../APIs/goodreads.api');


const getBindingFromMediaTypes = (mediaTypes) => {
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

  const bindingValue = bindings.join(' or ');

  return `binding:${bindingValue}`;
}

const pluckBooksFromResponse = (searchTerm, result) => {
  const books = result
    .map(book => {
      const id = get(book, 'ASIN[0]');
      const author = get(book, 'ItemAttributes[0].Author[0]');
      const title = get(book, 'ItemAttributes[0].Title[0]');
      const image = get(book, 'LargeImage[0].URL[0]');
      const releaseDate = get(book, 'ItemAttributes[0].ReleaseDate[0]');

      if (!author && !title && !image) {
        return null;
      }

      return { id, author, title, image, releaseDate };
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

module.exports.populateAuthorInfo = (track) => {
  const { id, title: author, mediaTypes } = track;

  return searchAmazon({
    id,
    author,
    power: getBindingFromMediaTypes(mediaTypes),
  }).then(response => {
    const relevantBooks = pluckBooksFromResponse(author, response);

    return Object.assign({}, track, {
      items: relevantBooks,
    });
  }).catch(err => {
    // TODO: Handle
    throw new Error(err);
  });
}
