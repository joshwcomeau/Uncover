# 📚 Uncover

> Find your next new book in 1 step.

Uncover is a new-release aggregator that helps you discover when your favourite authors release new books. The goal is to provide a single page that you can bookmark, and check whenever you want to find a new book.

The feature-set is incredibly simple: a single page that shows you the newest books published by authors you choose. I do have features I plan on adding, but the core concept will remain the same: a simple, quick way to find new stuff you'll like.


### Technical Details

Uncover is a full-stack application, running Node/Express on the server and Vue.js (with vue-router, vuex) on the client.

Most of the logic happens on the client. The server, at the time of writing, is mostly just a thin wrapper around the Goodreads and Amazon Product Advertising APIs.

I wanted to avoid implementing an accounts system. This is both because I don't believe it's necessary (at least, not yet), and because I like the idea of not collecting potentially personally-identifiable information. While it sounds silly, we all have [guilty pleasures](https://books.google.ca/books?id=HlbyMWKuQQUC&printsec=frontcover&dq=isbn:9780345518569&hl=en&sa=X&ved=0ahUKEwjAsfjXuMDSAhUS92MKHXLOCSkQ6AEIHDAA#v=onepage&q&f=false), and that data should be kept private!

Instead, your list of authors and related settings are all stored in local storage. If you need to, you can copy that data to a new device or browser using the Import/Export functionality. I recognize that this is a tedious process; in the future I may introduce an "email me a link to copy the data" feature. Or maybe anonymously store data on a server and simply have a passkey to access it.

Finally, this was my first time using Vue, so it should not be taken as an authoritative source on writing Vue apps.


### Running Locally

Running locally is, to be honest, a pain. The reason is that you'll need to supply your own API keys for Goodreads and Amazon Product Advertising. The latter requires a fairly lengthy sign-up, _and_ you need to make sales every few months, otherwise they'll close your account.

If that hasn't discouraged you, you'll need to provide the following data, in a file located at `config/server.env.js`:

```js
module.exports = {
  AWS_KEY: 'XXX',
  AWS_SECRET: 'XXX',
  ASSOCIATE_TAG: 'XXX',
  GOODREADS_KEY: 'XXX',
  GOODREADS_SECRET: 'XXX',
};
```

You can launch a local instance with these two scripts (I know, I should really use webpack-hot-middleware and combine them, but I haven't found the time):

```js
npm run start:client:dev
npm run start:server:dev
```
