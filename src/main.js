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
        type: 'author',
      },
      b: {
        id: 'b',
        title: 'Jim Butcher',
        type: 'author',
      },
      c: {
        id: 'c',
        title: 'Big Bang Theory',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/The_Big_Bang_Theory_(Official_Title_Card).png/250px-The_Big_Bang_Theory_(Official_Title_Card).png',
        type: 'tv-show',
      },
    },
    allIds: ['a', 'b', 'c'],
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
