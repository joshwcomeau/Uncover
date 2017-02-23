import Vue from 'vue';
import Router from 'vue-router';
import Home from 'components/Home';
import AddTrack from 'components/AddTrack';
import ImportExport from 'components/ImportExport';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/add-track',
      name: 'AddTrack',
      component: AddTrack,
    }, {
      path: '/import-export',
      name: 'ImportExport',
      component: ImportExport,
    },
  ],
});
