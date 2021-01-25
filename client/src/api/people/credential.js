import request from '@/utils/request'

// 获取资格证书
export function getQualification(params) {
  return request({
    url: '/vue-admin-template/people/getQualification',
    method: 'get',
    params
  })
}
// 提交资格证书
export function postQualification(params) {
  return request({
    url: '/vue-admin-template/people/postQualification',
    method: 'post'
  })
}
// 获取执行证书
export function getExecute(params) {
  return request({
    url: '/vue-admin-template/people/getExecute',
    method: 'get',
    params
  })
}
// 提交执行证书
export function postExecute(params) {
  return request({
    url: '/vue-admin-template/people/postExecute',
    method: 'post'
  })
}
// 获取助产证
export function getMidwife(params) {
  return request({
    url: '/vue-admin-template/people/getMidwife',
    method: 'get',
    params
  })
}
// 提交助产证
export function postMidwife(params) {
  return request({
    url: '/vue-admin-template/people/postMidwife',
    method: 'post'
  })
}
// 获取其他证书
export function getOther(params) {
  return request({
    url: '/vue-admin-template/people/getOther',
    method: 'get',
    params
  })
}
// 提交其他证书
export function postOther(params) {
  return request({
    url: '/vue-admin-template/people/postOther',
    method: 'post'
  })
}
