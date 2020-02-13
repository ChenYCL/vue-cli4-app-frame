// eslint-disable-next-line import/no-cycle
import loginAxios from '@/plugins/axios/login';

export default {
  namespaced: true,
  state: {
    user: {},
    regions: [],
    regionItem: ''
  },
  mutations: {
    getUser(state, data) {
      state.user = data;
    },


  },
  actions: {
    login({}, param = {}) {
      return new Promise((resolve, reject) => {
        loginAxios.login(param)
          .then((data) => {
            resolve(data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout({ commit }, param = {}) {
      return new Promise(resolve => {
        loginAxios.logout(param)
          .then((data) => {
            commit('getUser', {});
            //commit('user/updateBasicinfo', {});
            resolve();
          })
          .catch(err => {
            this._vm.$message({ msg: err.message });
          });
      });

    },
  },
};
