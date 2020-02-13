import axios from './aixos';
import api from '../api/api';

class loginAxios {
  static login(param) {
    return this.commonRequest(api.login, param);
  }

  static logout(param) {
    return this.commonRequest(api.logout, param);
  }

  static registerVerifyCode(param) {
    return this.commonRequest(api.registerVerifyCode, param);
  }

  static register(param) {
    return this.commonRequest(api.register, param);
  }

  static findpwd(param) {
    return this.commonRequest(api.findpwd, param);
  }

  static findpwdVerifyCode(param) {
    return this.commonRequest(api.findpwdVerifyCode, param);
  }

  static getDistrictCode(param) {
    return this.commonRequest(api.getDistrictCode, param);
  }

  static getLoginInfo(param) {
    return this.commonRequest(api.getLoginInfo, param);
  }

  static commonRequest(apiStr, param = {}) {
    return axios({
      url: apiStr,
      data: param,
    });
  }
}

export default loginAxios;
