import { api } from '../api.js'

export default {
  getTest(params) {
    return api({ url: 'api/users/test', params, method: 'post' })
  },
  getInfo(params) {
    return api({ url: 'api/users/current', params, method: 'get' })
  },
  login(params) {
    return api({ url: 'api/users/login', params, method: 'post' })
  },
  register(params) {
    return api({ url: 'api/users/register', params, method: 'post' })
  },
  getAllUser(params) {
    return api({ url: 'api/users/allUser', params, method: 'get' })
  },
  getUser(params) {
    return api({ url: 'api/users/userQuery', params, method: 'post' })
  }
}
