import { api } from '../api.js'

export default {
  getAllSeat(params) {
    return api({ url: 'api/seat/allSeat', params, method: 'get' })
  },
}