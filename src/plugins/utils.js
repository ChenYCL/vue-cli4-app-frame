import $Decimal from 'decimal.js';
import axios from 'axios';

export default {
  isEmpty(obj) { // 判断输入是否为空
    if (typeof obj === 'undefined' || obj == null || obj == '') {
      return true;
    }
    const regu = '^[ ]+$';
    const re = new RegExp(regu);
    return re.test(obj);
    // return false;
  },
  isValidPhone(value) {
    return this.isRegexMatched(value, {
      regex: /^[0-9]{11}$/,
      includeEmptyCheck: false,
    });
  },
  isValidEmail(value) {
    return this.isRegexMatched(value, {
      regex: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
      includeEmptyCheck: false,
    });
  },
  isRegexMatched(value, { regex, includeEmptyCheck }) {
    return includeEmptyCheck
      ? this.isEmpty(value) && regex.test(value)
      : regex.test(value);
  },
  go(name, params) {
    return name.includes('/')
      ? this.$router.push({
        path: name,
        query: { ...params },
      })
      : this.$router.push({
        name,
        params: { ...params },
      });
  },
  imgUrl(url) {
    if ((/file/gi.test(location.href))) {
      return `${axios.defaults.baseURL}/${url}`;
    }

    return `${origin}/${url}`;
  },
  formatNum(val) {
    return new $Decimal(val);
  },
  checkNullObj(obj) {
    return Object.keys(obj).length === 0;
  },
};
