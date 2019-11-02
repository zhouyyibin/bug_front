// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import {
  VueAxios
} from './utils/request'
import moment from 'moment'
// mock
// import './mock'
import '@/components/use'
import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false

Vue.filter('dateTrim', function (value) {
  return value && moment(value).format('YYYY-MM-DD HH:mm')
})

Vue.filter('staticUrl', function (value) {
  return `http://${window.localStorage.getItem('VUE_APP_HOST') ? window.localStorage.getItem('VUE_APP_HOST') :  process.env.VUE_APP_HOST}:${window.localStorage.getItem('VUE_APP_PORT') ? window.localStorage.getItem('VUE_APP_PORT') :  process.env.VUE_APP_PORT}/download?path=${value}`
})

Vue.filter('fileName', function (value) {
  const arr = value.split('/')
  return arr[arr.length - 1]
})

Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    // 获取按钮权限
    const name = binding.value
    if (!hasPermission(name)) {
      el.parentNode.removeChild(el)
    }
  }
})

function hasPermission(name) {
  let finded = false
  const permissions = store.state.user.roles.permissions
  for (let i = 0; i < permissions.length; i++) {
    if (permissions[i].action === name) {
      finded = true
      break
    }

    if (permissions[i].actionEntitySet.length > 0) {
      if (permissions[i].actionEntitySet.includes(name)) {
        finded = true
        break
      }
    }
  }

  return finded
}

Vue.prototype.$_has = function (name) {
  return hasPermission(name)
}

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')