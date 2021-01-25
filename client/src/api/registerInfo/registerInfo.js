import request from '@/utils/request'

// 获取座位信息
export function registerInfo(idNumber) {
  return request({
    url: '/vue-admin-template/registerInfo/registerInfo',
    method: 'get',
    params: { idNumber }
  })
}
