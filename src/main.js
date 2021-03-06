import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from 'components/Pages/HomePage';
import LobbyPage from 'components/Pages/LobbyPage';
import RoomPage from 'components/Pages/RoomPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import IScrollView from 'vue-iscroll-view';
import IScroll from 'iscroll';
import store from 'store';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(IScrollView, IScroll);

library.add(faSignInAlt, faKey);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const routes = [
  { path: '/', component: HomePage },
  { path: '/lobby', component: LobbyPage },
  { path: '/room/:number', component: RoomPage }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
