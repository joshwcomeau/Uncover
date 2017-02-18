// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from './router';
import createStore from './store';
import { LOCAL_STORAGE_KEY } from './constants';


const initialState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: createStore(initialState),
  template: '<App/>',
  components: { App },
});
