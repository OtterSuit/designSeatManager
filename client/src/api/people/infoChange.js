import request from '@/utils/request'

// 获取信息变动列表信息
export function getInfoChange(params) {
  return request({
    url: '/vue-admin-template/people/getInfoChange',
    method: 'get',
    params
  })
}
// 添加信息变动信息
export function addInfoChange(params) {
  return request({
    url: '/vue-admin-template/people/addInfoChange',
    method: 'post'
  })
}
// 修改信息变动信息
export function editInfoChange(params) {
  return request({
    url: '/vue-admin-template/people/editInfoChange',
    method: 'post'
  })
}
// 删除信息变动信息
export function deleteInfoChange(params) {
  return request({
    url: '/vue-admin-template/people/deleteInfoChange',
    method: 'post'
  })
}
