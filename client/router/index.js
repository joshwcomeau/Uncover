import Vue from 'vue';
import Router from 'vue-router';
import Home from 'components/Home';
import AddTrack from 'components/AddTrack';

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
    },
  ],
});
