import { api } from '../api.js'

export default {
  getAllSeat(params) {
    return api({ url: 'api/seat/allSeat', params, method: 'get' })
  },
  getStorey(params) {
    return api({ url: 'api/seat/getStorey', params, method: 'get' })
  },
  chooseSeat(params) {
    return api({ url: 'api/seat/chooseSeat', params, method: 'post' })
  },
}