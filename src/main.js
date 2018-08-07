import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from 'components/Pages/HomePage';
import LobbyPage from 'components/Pages/LobbyPage';
import RoomPage from 'components/Pages/RoomPage';
import store from 'store';
import App from './App.vue';

Vue.use(VueRouter);

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
