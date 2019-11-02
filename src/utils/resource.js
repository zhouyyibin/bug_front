import Vue from 'vue'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { ERROR_CODES } from '@/utils/variables'
import { VueAxios } from './request'

// const HOSTS = ['120.77.85.111', '61.144.170.37']
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : `http://${window.localStorage.getItem('VUE_APP_HOST') ? window.localStorage.getItem('VUE_APP_HOST') :  process.env.VUE_APP_HOST}:${window.localStorage.getItem('VUE_APP_PORT') ? window.localStorage.getItem('VUE_APP_PORT') :  process.env.VUE_APP_PORT}`,
  timeout: 6000
})

instance.interceptors.request.use(config => {
  if (Vue.ls.get('token')) {
    config.headers['Authorization'] = Vue.ls.get('token')
  }
  return config
})

instance.interceptors.response.use(res => {
  if ((res.data.status && res.data.status !== 200) || (res.data.code && res.data.code !== 200)) {
    notification.error({
      message: '错误提示',
      description: ERROR_CODES[res.data.code]
    })

    return Promise.reject(ERROR_CODES[res.data.code])
  }
  return res.data
})

export default instance
