import request from '@/utils/request'

// 获取座位信息
export function getSeatList(a) {
  return request({
    url: '/vue-admin-template/seat/seatList',
    method: 'get',
    params: { a }
  })
}
