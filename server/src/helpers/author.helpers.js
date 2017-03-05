const { get } = require('lodash');
const isFuture = require('date-fns/is_future');

const {
  getBindingFromMediaTypes,
  createPowerString,
  searchAmazon,
} = require('../APIs/product-advertising.api');
const { searchForAuthor, getAuthorInfo } = require('../APIs/goodreads.api');


const pluckBooksFromAmazonResponse = (searchTerm, result) => (
  result
    .map((book) => {
      const id = get(book, 'ASIN[0]');
      const author = get(book, 'ItemAttributes[0].Author[0]');
      const title = get(book, 'ItemAttributes[0].Title[0]');
      const image = get(book, 'LargeImage[0].URL[0]');
      const url = get(book, 'DetailPageURL[0]');

      const releaseDate = (
        get(book, 'ItemAttributes[0].PublicationDate[0]')
      );

      const isMissingData = !author || !title || !image;

      // Ignore books in the future
      const isPreorder = isFuture(releaseDate);

      // Ignore comic books
      // TODO: figure out if this strategy is dependable. If so, enable
      // comic search as an option?
      const isComic = (
        get(book, 'ItemAttributes[0].PartNumber[0]') === 'illustrations'
      );

      if (isMissingData || isPreorder || isComic) {
        return null;
      }

      return { id, author, title, image, url, releaseDate };
    })
    .filter(book => (
      !!book && !!book.author
    ))
);

const getTrackItems = (track, options) => {
  const {
    name: author,
    meta: { mediaTypes },
  } = track;

  const power = {
    'author-exact': author,
    // TODO: Support other languages?
    language: 'english',
  };

  // Annoyingly, Amazon is very quirky with how it sorts data from multiple
  // media types. For now, the solution is to restrict, on the client, users
  // from selecting multiple types. In the future, though, we may solve it
  // by sending multiple requests.
  // A side effect is that the client sends `mediaTypes` as a single value,
  // so we need to wrap it in an array
  if (mediaTypes) {
    power.binding = getBindingFromMediaTypes([mediaTypes]);
  }

  const query = { power: createPowerString(power) };

  return searchAmazon(query, options).then((response) => {
    const relevantBooks = pluckBooksFromAmazonResponse(author, response);

    return Object.assign({}, track, {
      items: relevantBooks,
    });
  }).catch((err) => {
    // TODO: Handle
    throw new Error(err);
  });
};

module.exports.getTrackItems = getTrackItems;

module.exports.getAuthorProfileAndTrackItems = async (searchTerm) => {
  const { id, name } = await searchForAuthor(searchTerm);

  // Fetch the author's basic info (profile photo, bio), as well as their
  // most recent releases.
  const [authorInfo, trackItems] = await Promise.all([
    getAuthorInfo(id),
    getTrackItems({ id, name, meta: {} }, { sort: 'salesrank' }),
  ]);

  return {
    id,
    name: trackItems.name, // Using Amazon's response for accuracy
    image: authorInfo.image_url,
    items: trackItems.items,
  };
};
