import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
import plugins from './plugins';

Vue.use(Vuex);


function createStore(initialState) {
  return new Vuex.Store({
    state: initialState,
    actions,
    getters,
    mutations,
    plugins,
  });
}

export default createStore;
