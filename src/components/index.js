import Vue from 'vue';
// eslint-disable-next-line import/extensions
import Message from './message/index.js';

const empty = () => import(/* webpackChunkName: "empty" */ './empty/empty');
const bar = () => import(/* webpackChunkName: "bar" */ './lineBar/index');
const list = () => import(/* webpackChunkName: "radio" */ './list/index');
const sheet = () => import(/* webpackChunkName: "sheet" */ './ch_bottom-sheet/index');
const sms = () => import(/* webpackChunkName: "sms" */ './smsCount/index');
const tQrcode = () => import(/* webpackChunkName: "qrcode" */ './qrcode/index.vue');
const tCopy = () => import(/* webpackChunkName: "qrcode" */ './copy/index.vue');
Vue.component('empty', empty);
Vue.component('t-bar', bar);
Vue.component('t-list', list);
Vue.component('t-sheet', sheet);
Vue.component('sms', sms);
Vue.component('t-qrcode', tQrcode);
Vue.component('t-copy', tCopy);

Vue.prototype.$message = Message;
