import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

window.axios = require('axios')
window.axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
