<template>
    <div id="app">
        <router-view/>
        <v-bottom-nav v-if="false"></v-bottom-nav>
        <div
            v-if="appBarShow"
            class="none-transition v-bottom-nav box-shadow v-bottom-nav--fixed v-bottom-nav--active  app-nav"
        >
            <router-link
                tag="a"
                :to="item.needLogin ? '/login' : item.routePath"
                class="none-transition wrapper "
                v-for="(item, index) in navList"
                :key="index"
            >
                <v-icon  color="green darken-2">
                    mdi-domain
                </v-icon>
                <div class="router-title">{{item.name}}</div>

            </router-link>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'App',
    components: {},
    computed: {
      ...mapState('login', ['user']),
      navList() {
        return [
          {
            name: 'Recent',
            icon: 'rencents',
            routeName: 'rencents',
            routePath: '/',
          },
          {
            name: 'Favorite',
            icon: 'favorite',
            routeName: 'favorite',
            routePath: '/favorite',
          },
          {
            name: 'Nearby',
            icon: 'nearby',
            routePath: '/nearby',
            routeName: 'nearby',
          },
          {
            name: 'Person',
            icon: 'person',
            routeName: 'person',
            routePath: '/person',
            needLogin: !(this.user && this.user.uid), // 或者是当前 登陆装 cookie

          },
        ];
      },
    },
    data() {
      return {
        appBarShow: true,

      };
    },
  };
</script>

<style lang="scss" scoped>
    .app-nav {
        z-index: 99;
        background: $bg;
    }



    .box-shadow {
        box-shadow: 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .none-transition {
        transition: none !important;
    }

    .none-transition:before {
        transition: none !important;
    }

    .wrapper {
        display: inline-flex;
        flex-direction: column;
        text-align: center;
        font-size: 0;
        text-decoration: none;

    }

    .router-title{
        font-size: 12px;
        color: #2AB3FF;
    }




    .v-bottom-nav--fixed {
        & > a {
            width: 25%;
            display: inline-flex;
            height: 100%;
            align-items: center;
            justify-content: center;
        }
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .v-bottom-nav {
        height: 48px;
    }
</style>
