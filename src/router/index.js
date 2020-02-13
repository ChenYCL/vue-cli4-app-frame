import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import loginRouter from './loginRouter';


Vue.use(Router);

const router = new Router({
  mode: (/file/gi.test(location.href)) ? 'hash' : 'history',
  base: (/file/gi.test(location.href)) ? '/' : process.env.NODE_ENV === 'development' ? '/' : '/',
  // 滚动条 行为
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,

    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    loginRouter,
  ],
});


export default router;
