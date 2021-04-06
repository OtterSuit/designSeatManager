import { api } from '../api.js'

export default {
  // 获取座位信息 并可视化
  getSeat(params) {
    return api({ url: 'api/seat/find', params, method: 'post' })
  },

  // 预约座位
  postAppointmentSeat(params) {
    return api({ url: 'api/seat/appointment', params, method: 'post' })
  },
  getStorey(params) {
    return api({ url: 'api/seat/getStorey', params, method: 'get' })
  },
  chooseSeat(params) {
    return api({ url: 'api/seat/chooseSeat', params, method: 'post' })
  },
  // 入座
  pickSeat(params) {
    return api({ url: 'api/seat/pickSeat', params, method: 'post' })
  },
}