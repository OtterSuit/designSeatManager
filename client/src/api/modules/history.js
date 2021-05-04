import { api } from '../api.js'

export default {
  // 添加历史信息
  historyPush(params) {
    return api({ url: 'api/history/push', params, method: 'post' })
  },
  // 查询历史信息
  historyFind(params) {
    return api({ url: 'api/history/find', params, method: 'post' })
  },
  // 查询统计聚合
  historySum(params) {
    return api({ url: 'api/history/sum', params, method: 'post' })
  },
  // 查询历史信息（个人向）
  historyFindOne(params) {
    return api({ url: 'api/history/findForOne', params, method: 'post' })
  }
}
