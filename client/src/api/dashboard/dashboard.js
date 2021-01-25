import request from '@/utils/request'

// 获取座位信息
export function getDashboard() {
  return request({
    url: '/vue-admin-template/dashboard/dashboardAll',
    method: 'get'
  })
}
