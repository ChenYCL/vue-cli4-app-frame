import i18n from '@/plugins/i18n/i18n.js'

export default {
  namespaced: true,
  state: {
    lang: '中文简体'
  },
  mutations: {
    initLang(state){
      const lang = window.localStorage.getItem('lang') || 'zh';
      i18n.locale = lang;
      state.lang = lang;
    },
    setLang(state, payload = {
      name: '中文简体',
      lang: 'zh'
    }){
      window.localStorage.setItem('lang', payload);
      i18n.locale = payload.lang;
      state.lang = payload.name;
    }
  }
}
