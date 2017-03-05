import Vue from 'vue';
import Router from 'vue-router';

import About from 'routes/About';
import AddTrack from 'routes/AddTrack';
import Home from 'routes/Home';
import ImportExport from 'routes/ImportExport';
import Intro from 'routes/Intro';

Vue.use(Router);


const router = new Router({
  mode: 'history',
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
    }, {
      path: '/about',
      name: 'About',
      component: About,
    }, {
      path: '/intro',
      name: 'Intro',
      component: Intro,
    },
  ],
});

export default router;
