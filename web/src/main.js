import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { ajax,rand,formatTime,zipImage } from './utils/index.js'

Vue.config.productionTip = false
const utils = {
  ajax: ajax,
  rand: rand,
  formatTime: formatTime,
  zipImage: zipImage
}
Vue.prototype.$utils = utils
Vue.prototype.$checkUser = function() {
  const userid = localStorage.getItem('userid.night.xtzero.me')
  const name = localStorage.getItem('name.night.xtzero.me')
  if (!userid) {
    this.$router.push('/login')
  } else {
    this.$store.state.user.id = userid
    this.$store.state.user.name = name
    utils.ajax('checkUser', {
      userid: userid
    }).then((res) => {
      if (res.data.code != 200) {
        this.$router.push('/login')
      }
    }).catch((e) => {
      Vue.prototype.$message({
        type: 'error',
        message: '检查用户时出现错误'
      })
    })
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = to.meta
  next()
})