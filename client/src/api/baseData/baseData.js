import request from '@/utils/request'

// 获取人员信息
export function getPeopleInfo() {
  return request({
    url: '/baseData/people',
    method: 'get'
  })
}
// 基础数据座位
export function getSeatInfo() {
  return request({
    url: '/baseData/seat',
    method: 'get'
  })
}
