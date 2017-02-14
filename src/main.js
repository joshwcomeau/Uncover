// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from './router';
import createStore from './store';


// TODO: Pull this from localStorage.
const defaultState = {
  tracks: {
    byId: {
      a: {
        id: 'a',
        title: 'Drew Hayes',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51l0kTIGm3L._UX250_.jpg',
        category: 'author',
        mediaTypes: ['audiobook'],
      },
      b: {
        id: 'b',
        title: 'Jim Butcher',
        category: 'author',
        mediaTypes: ['ebook', 'print'],
      },
    },
    allIds: ['a', 'b'],
  },
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: createStore(defaultState),
  template: '<App/>',
  components: { App },
});
