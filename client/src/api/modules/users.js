import { api } from '../api.js'

export default {
  getTest(params) {
    return api({ url: 'api/users/test', params, method: 'get' })
  }
}
