const loginMain = () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue');

export default {
  path: '/login',
  component: loginMain,
  children: [],
};
