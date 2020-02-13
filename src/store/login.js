import loginAxios from '@/plugins/axios/login';

export default {
  namespaced: true,
  state: {
    user: {},
    regions: [],
    regionItem: ''
  },
  mutations: {
    getUser(state, data){
      state.user = data;
    },
    setRegions(state, data){
      const arr = [];
      let count = 0;
      for(var i in data){
        const obj = {};
        obj.text = [i,data[i]];
        obj.value = count.toString();
        arr.push(obj);
        count+=1;
      }
      state.regions = arr;
    },
    updateRegion(state, region){
      state.regionItem = region;
    },

  },
  actions: {
    login({}, param = {}){
      return new Promise((resolve, reject) => {
        loginAxios.login(param).then((data) => {
          resolve(data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({commit}, param = {}){
      return new Promise(resolve => {
        loginAxios.logout(param).then((data) => {
          commit('getUser', {});
          //commit('user/updateBasicinfo', {});
          resolve();
        }).catch(err => {
          this._vm.$message({msg: err.message});
        })
      })

    },
    getLoginInfo({commit}, param = {}){
      loginAxios.getLoginInfo(param).then((data) => {
        commit('getUser', data.data);
      }).catch(err => {
        console.log(err.message)
        //this._vm.$message({msg: err.message});
      })
    },
    registerVerifyCode({}, param = {}){
      return new Promise((resolve, reject) => {
        loginAxios.registerVerifyCode(param).then(res => {
          //commit('takeVerifyCode')
          resolve(res);
        }).catch(err => {
          reject(err);
          //state.coinVerfiy.verifyCodeTimeText = ''
        })
      })
    },
    register({}, param = {}){
      return new Promise((resolve, reject) => {
        loginAxios.register(param).then(res => {
          //commit('getUser', res.data);
          resolve(res)
        }).catch(res => {
          reject(res);
        })
      })
    },
    findpwd({commit}, param = {}){
      return new Promise((resolve, reject) => {
        loginAxios.findpwd(param).then(res => {
          commit('getUser', res.data);
          resolve(res)
        }).catch(res => {
          reject(res);
        })
      })
    },
    findpwdVerifyCode({}, param = {}){
      return new Promise((resolve, reject) => {
        loginAxios.findpwdVerifyCode(param).then(res => {
          //commit('takeVerifyCode')
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    getDistrictCode({commit}){
      loginAxios.getDistrictCode().then((data)=>{
        commit("setRegions", data.data);
      }).catch((err)=>{
        console.log(err);
      })
    },
  },
}
