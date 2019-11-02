import axios from '../utils/resource'

export default {
  async login ({ account, password }) {
    const res = await axios.post('/login', {
      account,
      password
    })

    localStorage.setItem('token', res.data)

    return res
  },

  getUserinfo () {
    return axios.get('/my/information')
  }
}
