import Vue from 'vue'
import App from '@/App.vue'
import Router from '@/setup/router'
import KirbyApi from '@/setup/kirby-api'
import wb from '@/setup/registerServiceWorker'
import '@/setup/plugins'

Vue.config.productionTip = false

const apiUrl = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_KIRBY_URL : (window.location.origin + process.env.BASE_URL).slice(0, -1)

;(async () => {
  const api = KirbyApi.init(apiUrl)
  const home = await api.getPage('home')
  const router = await Router.init(home.site)

  Vue.prototype.$api = api
  Vue.prototype.$home = home
  Vue.prototype.$site = home.site
  Vue.prototype.$workbox = wb

  new Vue({
    router,

    computed: {
      isHomePage () {
        return this.$route.name === 'home'
      }
    },

    methods: {
      scrollTop () {
        window.scrollTo(0, 0)
      }
    },

    render: h => h(App)
  }).$mount('#app')
})()
