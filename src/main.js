import Vue from 'vue';
import vuetify from './plugins/vuetify';
import { Decimal } from 'decimal.js';
import '@/components/index';
import '@/plugins/mixin';
import VueClipboards from 'vue-clipboard2';
import i18n from '@/plugins/i18n/i18n';

import App from './App.vue';
import router from './router';
import store from './store';
import { deboune as vDebounce } from './components/v-debounce/index';

Vue.prototype.$Decimal = Decimal;
Vue.config.productionTip = false;
Vue.use(VueClipboards);
Vue.use(vDebounce);

// 全量拦截器
router.beforeEach((to, from, next) => {
  // 逻辑处理区

  next();
});
new Vue({
  router,
  store,
  i18n,
  vuetify,
  beforeCreate() {
    this.$store.$vm = this;
  },
  render: (h) => h(App),
}).$mount('#app');
