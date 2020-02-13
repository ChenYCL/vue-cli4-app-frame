import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : '', // 生产地址
  withCredentials: process.env.NODE_ENV === 'development',
  method: 'post',
  responseType: 'json',
  timeout: 10000,
  headers: {},
});

instance.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

instance.interceptors.request.use(
  (config) => {
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      return config;
    }
    config.data = {
      data: config.data,
      // cookie : document.cookie
    };
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (res) => {
    if (res.data && res.data.code == 1000) {
      return Promise.resolve(res.data);
    }
    if (res.data && res.data.code === 4003) {
      store.dispatch('login/logout');
    }

    return Promise.reject({
      code: res.data.code,
      message:
          (res.data && res.data.message)
          || `${res.config.url.replace(res.config.baseURL, '')
          }<br />Response Error！(*^▽^*)`,
    });
  },
  (error) => {
    if (error.message.indexOf('timeout of') === 0) {
      return Promise.reject({
        message: '业务繁忙，请稍后重试',
        code: -1,
      });
    }

    return Promise.reject({
      message: error.message,
      code: error.code,
    });
  },
);

export default instance;
