import { api } from '../api.js'

export default {
  // 举报接口
  informant(params) {
    return api({ url: 'api/reputation/informant', params, method: 'post' })
  },
  //查询
  getInfoForReputation(params) {
    return api({ url: 'api/reputation/find', params, method: 'post' })
  }
}
