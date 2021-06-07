import colors from 'vuetify/es5/util/colors'

const firebaseConfig = {
  apiKey: 'AIzaSyDi7FTJplxdcfOjRdkq4in0MsA-MSRLULc',
  authDomain: 'scoar-app.firebaseapp.com',
  databaseURL: (process.env.NODE_ENV === 'production')
    ? 'https://scoar-app.firebaseio.com'
    : 'http://localhost:9000?ns=fake-server',
  projectId: 'scoar-app',
  storageBucket: 'scoar-app.appspot.com',
  messagingSenderId: '863908883910',
  appId: '1:863908883910:web:809f00cd5b6a123c6c16c7',
  measurementId: 'G-RG65LNDC1C'
}

const firebaseFunctionsConfig = {
  location: 'us-central1',
  emulatorPort: 5001,
  emulatorHost: 'http://localhost'
}

export default {
  loading: false,

  vue: {
    config: {
      devtools: process.env.NODE_ENV !== 'production'
    }
  },

  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: false,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/global.js'
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: {
    dirs: [
      '~/components',
      '~/components/Forms',
      '~/components/Cards'
    ]
  },

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    // '@nuxt/content',
    '@nuxtjs/firebase',
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: (process.env.NODE_ENV !== 'production') ? 'http://localhost:3333/' : 'https://scoar-app-hub.herokuapp.com/',
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  },

  firebase: {
    config: firebaseConfig,
    services: {
      database: true,
      functions: (process.env.NODE_ENV !== 'production') ? firebaseFunctionsConfig : true,
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction'
        },
        ssr: false
      }
    }
  },
  pwa: {
    meta: true,
    icon: {
      source: 'assets/images/if.png'
    },
    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false
    }
  },
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
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
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
