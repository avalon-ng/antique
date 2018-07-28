import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  socket: null
};

const mutations = {
  connect (state, socket) {
    state.socket = socket;
  }
};

const actions = {
  connect: ({ commit }, socket) => commit('connect', socket)
};

const getters = {
  getSocket: state => state.socket
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});