import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css';


Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    theme: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
};

export default new Vuetify(opts);
