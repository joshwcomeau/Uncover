import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);


function createStore(initialState) {
  return new Vuex.Store({
    state: initialState,
    getters,
    actions,
    mutations,
  });
}

export default createStore;
