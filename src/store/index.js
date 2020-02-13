import Vue from 'vue';
import Vuex from 'vuex';
import login from './login';
import ui from './ui';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 全局的属性
    theme: 'light'
  },
  mutations: {
    theme(state, data) {
      state.theme = data;
    }
  },
  actions: {},
  modules: {
    login,
    ui,
  }
});
