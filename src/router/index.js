import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import favorite from '@/views/favorite/favorite.vue';
import nearby from '@/views/nearby/nearby.vue';
import person from '@/views/person/person.vue';
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
      name: 'rencents',
      component: Home,

    },
    {
      path: '/favorite',
      name: 'favorite',
      component: favorite,
    },
    {
      path: '/nearby',
      name: 'nearby',
      component: nearby,
    },
    {
      path: '/person',
      name: 'person',
      component: person,
    },
    loginRouter,
  ],
});


export default router;
