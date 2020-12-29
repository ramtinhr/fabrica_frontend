// eslint-disable-next-line nuxt/no-cjs-in-config
const webpack = require('webpack')

export default {
  target: 'server',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'fa-IR',
      dir: 'rtl',
    },
    title:
      'فابریکا  - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش  نو و دست دوم و کارکرده',
    meta: [
      { charset: 'utf-8' },
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
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/images/logo.png',
      },
    ],
  },

  loading: false,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/helpers/number.js',
    '~/plugins/helpers/string.js',
    '~/plugins/helpers/date.js',
    '~/plugins/helpers/api-message.js',
    '~/plugins/application.js',
    { src: '~plugins/vee-validate.js', mode: 'client' },
    { src: '~/plugins/vue-awesome-swiper.js', mode: 'client' },
    { src: '~/plugins/font-awesome.js', ssr: false },
    { src: '~/plugins/upload.js', ssr: false },
    { src: '~plugins/vue-slider.js', ssr: false },
    { src: '~plugins/vue-select.js', ssr: true },
  ],
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
    'cookie-universal-nuxt',
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        defaultBreakpoint: 'default',
        breakpoints: {
          xs: 576,
          sm: 768,
          md: 992,
          lg: 1200,
          xl: Infinity,
        },
      },
    ],
  ],

  toast: {
    position: 'bottom-center',
    duration: 6000,
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
    baseURL: 'https://api.fabrica.ir',
    headers: {
      Accept: 'application/json',
    },
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: '/assets/',
    transpile: ['vee-validate/dist/rules', 'vue-moment-jalaali'],
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash',
      }),
    ],
  },
  router: {
    router: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active',
    },
    extendRoutes(routes) {
      routes.push({
        name: '404',
        path: '*',
        redirect: '/404',
      })
    },
  },
  messages: {
    server_error: 'مشکل سیستم',
    back_to_home: 'داشبورد',
    server_error_details: 'مشکلی به وجود آمده است',
  },

  env: {
    BASE_URl: 'https://api.fabrica.ir',
  },
}
