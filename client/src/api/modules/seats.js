import { api } from '../api.js'

export default {
  // 获取座位信息 并可视化
  getSeat(params) {
    return api({ url: 'api/seat/find', params, method: 'post' })
  },
  getAllSeat(params) {
    return api({ url: 'api/seat/allSeat', params, method: 'get' })
  },
  // 预约座位
  postAppointmentSeat(params) {
    return api({ url: 'api/seat/appointment', params, method: 'post' })
  },
  getStorey(params) {
    return api({ url: 'api/seat/getStorey', params, method: 'get' })
  },
  // 入座
  pickSeat(params) {
    return api({ url: 'api/seat/pickSeat', params, method: 'post' })
  },
  // 一键退座
  outAllSeat(params) {
    return api({ url: 'api/seat/outAllSeat', params, method: 'post' })
  },
  // 用户退座
  outSeat(params) {
    return api({ url: 'api/seat/outSeat', params, method: 'post' })
  },
  // 注册座位 基础base模块
  registerSeat(params) {
    return api({ url: 'api/seat/register', params, method: 'post' })
  },
  // 改变座位状态 暂时离开
  leaveSeatNow(params) {
    return api({ url: 'api/seat/status', params, method: 'post' })
  },
  // 删除座位
  removeSeat(params) {
    return api({ url: 'api/seat/remove', params, method: 'delete' })
  }
}
