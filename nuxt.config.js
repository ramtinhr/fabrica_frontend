export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'fa-IR',
      dir: 'rtl',
    },
    title: 'فابریکا',
    meta: [
      { charset: 'utf-8' },
      // { name: 'enamad', content: '382221' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'فابریکا؛ ثبت آگهی و خریدی مطئن با فابریکا',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'فابریکا , ثبت آگهی',
      },

      { hid: 'og:title', property: 'og:title', content: 'فابریکا' },
      { hid: 'og:locale', property: 'og:locale', content: 'fa_IR' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'فابریکا' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://www.fabrica.ir' },
      { hid: 'og:description', property: 'og:description', content: 'فابریکا' },
      {
        hid: 'og:image:width',
        name: 'og:image:width',
        property: 'og:image:width',
        content: '512',
      },
      {
        hid: 'og:image:height',
        name: 'og:image:height',
        property: 'og:image:height',
        content: '512',
      },
      {
        hid: 'og:image:type',
        name: 'og:image:type',
        property: 'og:image:type',
        content: 'image/png',
      },

      { name: 'robots', content: 'index follow' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE:edge' },
      { name: 'msapplication-TileColor', content: '#ffc40d' },
      { name: 'theme-color', content: '#f1c446' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    [
      'nuxt-i18n',
      {
        strategy: 'prefix_except_default',
      },
    ],
  ],

  toast: {
    position: 'bottom-center',
    duration: 8000,
  },
  i18n: {
    locale: 'fa',
    locales: ['fa'],
    defaultLocale: 'fa',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        fa: require('./locale/fa.json'),
      },
      silentTranslationWarn: true,
    },
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    retry: {
      retries: 0,
    },
    baseURL: 'https://api.fabrica.ir/ads/search',
    headers: {
      Accept: 'application/json',
    },
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: '/assets/',
    transpile: ['vee-validate/dist/rules', 'vue-moment-jalaali'],
  },
  router: {
    extendRoutes(routes) {
      routes.push({
        name: '404',
        path: '*',
        redirect: '/404',
      })
    },
  },
}
