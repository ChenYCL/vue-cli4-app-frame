// eslint-disable-next-line no-unused-vars
const fs = require('fs');

const path = require('path');

const env = process.env.NODE_ENV;
// gzip
const CompressionPlugin = require('compression-webpack-plugin');

// zopfli压缩
const zopfli = require('@gfx/zopfli');

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

console.log('vue.config.js');

const resolve = (dir) => path.join(__dirname, dir);

// 按需引入 vuetify
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  // "@antv/g2":'G2'
};

const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [],
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdn.bootcss.com/vue/2.5.21/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      'https://gw.alipayobjects.com/os/lib/antv/g2/3.4.10/dist/g2.min.js',
    ],
  },
};


module.exports = {
  // cdn

  // env
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: true,
  assetsDir: 'static',
  pages: undefined, // 多页入口
  integrity: false, // 默认不开启 cdn sri安全问题
  // 是否使用包含运行时编译的Vue构建版本
  runtimeCompiler: false,
  // eslint-disable-next-line global-require
  parallel: require('os')
    .cpus().length > 1, // 多线程打包
  productionSourceMap: env === 'development',
  configureWebpack: (config) => {
    // 生产环境下
    const pluginsPro = [
      new VuetifyLoaderPlugin(),
      new CompressionPlugin({
        algorithm(input, compressionOptions, callback) {
          return zopfli.gzip(input, compressionOptions, callback);
        },
        compressionOptions: {
          numiterations: 15,
        },
        test: productionGzipExtensions,
        threshold: 8192, // 达到10kb的静态文件进行压缩 按字节计算
        minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
        deleteOriginalAssets: false, // 使用删除压缩的源文件
      }),
      // Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin({
        analyzerPort: 8889,
      }),
    ];


    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line no-param-reassign
      config.entry.app = ['babel-polyfill', './src/main.js'];
      // eslint-disable-next-line no-param-reassign
      config.externals = externals; // npm包转cdn
      // eslint-disable-next-line no-param-reassign
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // config.plugins = [...config.plugins, ...pluginsDev];
      // eslint-disable-next-line no-param-reassign
      config.plugins = [...config.plugins, new VuetifyLoaderPlugin()];
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('static', resolve('src/static'))
      .set('views', resolve('src/views'))
      .set('public', resolve('public/images/'));

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    config.plugin('html')
      .tap((args) => {
        // title注入
        // eslint-disable-next-line no-param-reassign
        args[0].title = '模版';
        if (process.env.NODE_ENV === 'production') {
          // eslint-disable-next-line no-param-reassign
          args[0].cdn = cdn.build;
        }
        if (process.env.NODE_ENV === 'development') {
          console.log(args);
          // eslint-disable-next-line no-param-reassign
          args[0].cdn = cdn.dev;
        }
        return args;
      });
  },
  // css
  css: {
    requireModuleExtension: true,
    extract: true,
    sourceMap: env === 'development',
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        // prependData: `@import "~@/variables.sass"`
      },
      scss: {
        prependData: `
                @import '@/assets/scss/config.module.scss';
               @import '@/assets/scss/common.scss';`,
      },
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff',
        },
      },
    },
  },
  // 代理
  devServer: {
    host: '0.0.0.0',
    // port:8000,
    https: false,
    open: true,
    hotOnly: false,
    proxy: {
      '/api': {
        target: '',
        secure: false,
        changeOrigin: true,
        ws: false,
        pathRewrite: {},
      },
    },
  },


};
