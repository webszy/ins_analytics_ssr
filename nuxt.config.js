const info=require('./assets/content/seo')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: info.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: info.description },
      { hid: 'keywords', name: 'keywords', content: info.keywords },
      { name:'og:site_name',property:'og:site_name',content:info.name},
      { name:'og:title',property:'og:type',content:info.title},
      { name:'og:url',property:'og:url',content:'https://insanalysis.vip'},
      { name:'og:description',property:'og:description',content:info.description},
      { name:'og:image',property:'og:image',content:'https://insanalysis.vip/sharelogo.png'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://insanalysis.vip' },
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
    './assets/css/reset.css',
    './assets/css/fonts.css',
    'element-ui/lib/theme-chalk/index.css',
    './assets/css/swiper.min.css',
    './assets/css/animate.min.css',
    './assets/css/style.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/echarts',
    { src: '~/plugins/swiper.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    },
     postcss:{
      autoprefixer:{
        grid: true
      }
    },
    performance:{
    gzip:true,
    threshold:10240,
    prefetch:true
  },
   cache: true
  }
}
