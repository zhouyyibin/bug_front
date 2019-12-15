import Vue from 'vue'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  welcome
} from '@/utils/util'
import api from '@/api'
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: {},
    info: {},
    isFirstLogin: !!window.localStorage.getItem('pro__isFirstLogin')
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {
      name,
      welcome
    }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_FIRST_LOGIN: (state) => {
      state.isFirstLogin = !state.isFirstLogin
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        api.auth.login(userInfo).then(response => {
          const token = response.data.token
          if (response.data.firstLogin) {
            Vue.ls.set('isFirstLogin', true)
            commit('SET_FIRST_LOGIN')
          }
          Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        api.auth.getUserinfo().then(response => {
          const result = response.data
          if (result.roles && result.roles.length > 0) {
            const roles = {}
            roles.permissions = result.roles.reduce((total, item) => {
              return total.concat(item.permissions)
            }, [])
            commit('SET_ROLES', roles)
          }

          commit('SET_INFO', result)
          commit('SET_NAME', {
            name: result.name,
            welcome: welcome()
          })
          commit('SET_AVATAR', result.avatar)

          response.result = response.data
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_FIRST_LOGIN')
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove('isFirstLogin')
        resolve()
      })
    }

  }
}

export default user