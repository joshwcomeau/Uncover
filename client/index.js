// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from './router';
import createStore from './store';


// TODO: Pull this from localStorage.
const defaultState = {
  tracks: {
    byId: {},
    allIds: [],
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
