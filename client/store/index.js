import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
import plugins from './plugins';

Vue.use(Vuex);


const defaultState = {
  tracks: {
    byId: {},
  },
};


function createStore(initialState) {
  return new Vuex.Store({
    state: initialState || defaultState,
    actions,
    getters,
    mutations,
    plugins,
  });
}

export default createStore;
