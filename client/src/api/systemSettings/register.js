import request from '@/utils/request'

// 获取账号信息
export function getRegister(params) {
  return request({
    url: '/vue-admin-template/register/getRegister',
    method: 'get',
    params
  })
}
