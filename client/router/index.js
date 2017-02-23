import Vue from 'vue';
import Router from 'vue-router';
import About from '../components/About';
import AddTrack from '../components/AddTrack';
import Home from '../components/Home';
import ImportExport from '../components/ImportExport';
import Intro from '../components/Intro';

Vue.use(Router);

const router = new Router({
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
