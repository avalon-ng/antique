import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from 'components/Pages/HomePage.vue';
import LobbyPage from 'components/Pages/LobbyPage.vue';
import App from './App.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomePage },
  { path: '/lobby', component: LobbyPage }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

