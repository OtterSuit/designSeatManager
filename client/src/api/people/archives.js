import request from '@/utils/request'

// 获取用户个人档案
export function getUserArchives(params) {
  return request({
    url: '/vue-admin-template/people/userArchives',
    method: 'get',
    params
  })
}
// 人员管理模块-档案状态列表信息
export function getArchivesList(params) {
  return request({
    url: '/vue-admin-template/people/archivesList',
    method: 'get',
    params
  })
}

// 提交人员管理模块档案信息
export function postArchives(params) {
  return request({
    url: '/vue-admin-template/people/postArchives',
    method: 'post'
  })
}

// 人员管理模块-档案状态通过
export function passArchives(params) {
  return request({
    url: '/vue-admin-template/people/passArchives',
    method: 'post'
  })
}

// 人员管理模块-档案状态驳回
export function rejectArchives(params) {
  return request({
    url: '/vue-admin-template/people/rejectArchives',
    method: 'post'
  })
}

// 人员管理模块-档案状态删除
export function deleteArchives(params) {
  return request({
    url: '/vue-admin-template/people/deleteArchives',
    method: 'post'
  })
}
