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
  },
  // user落座
  postUserPickSeat(params) {
    return api({ url: 'api/users/pickSeat', params, method: 'post' })
  },
  // user全退
  postOutAllSeat(params) {
    return api({ url: 'api/users/outAllSeat', params, method: 'post' })
  },
  // user个人退座
  postOutSeat(params) {
    return api({ url: 'api/users/outSeat', params, method: 'post' })
  },
  // 修改密码
  modifyPwd(params) {
    return api({ url: 'api/users/password', params, method: 'post' })
  },
  // 按名字查
  userQueryForName(params) {
    return api({ url: 'api/users/userQueryForName', params, method: 'post' })
  },
  // 信誉分扣除
  reputationChange(params) {
    return api({ url: 'api/users/reputationChange', params, method: 'post' })
  }
}
