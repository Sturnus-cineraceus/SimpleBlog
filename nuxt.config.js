const colors = require('vuetify/es5/util/colors').default

const appconfig = require('./app.config').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + appconfig.title,
    title: appconfig.title || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: appconfig.description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: appconfig.icon }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '@/plugins/localStorage',
      mode: 'client'
    },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap'
  ],
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#795548",
          secondary: "#ff5722",
          accent: "#ff9800",
        }
      }
    }
  },
  sitemap: {
    path: '/sitemap.xml', // 出力パス
    hostname: appconfig.base_url,
    cacheTime: 1000 * 60 * 15,
    generate: false, // nuxt generate で静的ファイル出力する場合にはtrueにする
    exclude: [ // 除外項目
      '/manage/**',
      '/blog'
    ],
    async routes() {
      let url = appconfig.api_url + "/blogs?_limit=-1&_sort=id:DESC";
      const axios = require('axios');
      const posts = await axios.get(url);
      let urls = [];
      posts.data.forEach((val, idx, arr) => {
        let id = val.id;
        let posturl = appconfig.base_url + "/blog?id=" + id;
        let urlset = {
          loc: posturl,
          priority: 0.8
        }
        urls.push(posturl);
      });

      return urls;
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
