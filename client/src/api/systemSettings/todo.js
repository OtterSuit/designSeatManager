import request from '@/utils/request'

// 获取代办信息
export function getTodo(params) {
  return request({
    url: '/vue-admin-template/todo/getTodo',
    method: 'get',
    params
  })
}
