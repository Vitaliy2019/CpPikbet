const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
   mode: 'spa',
  //serverMiddleware: ['../api/auth'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/redirect-module',
    '@nuxtjs/sitemap'
  ],
  axios: {
    // baseURL: // process.env.NODE_ENV !== 'production' ? 'http://localhost:59501' : ''
    baseURL: 'https://localhost:5001'
    // baseURL: 'https://api.acrtr.ru'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/Account',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: '/api/Client/getuser',
            method: 'get',
            propertyName: 'user'
          },
          logout: false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/',
      //logout: '/',
      callback: '/callback'
      //home: '/login'
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Панель управления мордой сайта Pikbet.ru',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Ранель управления сайтом \n' +
          '    Произведена acrtr.ru на соременных технологиях.'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [{
      src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
      async: true,
      defer: true
    }, {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#3adced'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/theme.styl',
    '~/assets/style/app.styl',
    'font-awesome/css/font-awesome.css',
    'roboto-fontface/css/roboto/roboto-fontface.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vee-validate',
    '@/plugins/element-ui'
  ],


  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    }
  }
}
