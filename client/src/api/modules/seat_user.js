import { api } from '../api.js'

export default {
  // 选择座位
  chooseSeat(params) {
    return api({ url: 'api/seat_user/choose', params, method: 'post' })
  },
  getUsingSeats(params) {
    return api({ url: 'api/seat_user/using', params, method: 'get' })
  },
  checkSeats(params) {
    return api({ url: 'api/seat_user/check', params, method: 'get' })
  }
}
