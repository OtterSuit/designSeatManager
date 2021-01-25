import request from '@/utils/request'

// 获取进修生档案列表信息
export function getAdvanceArchives(params) {
  return request({
    url: '/vue-admin-template/people/getAdvanceArchives',
    method: 'get',
    params
  })
}
// 添加进修生档案信息
export function addAdvanceArchives(params) {
  return request({
    url: '/vue-admin-template/people/addAdvanceArchives',
    method: 'post'
  })
}
// 修改进修生档案信息
export function editAdvanceArchives(params) {
  return request({
    url: '/vue-admin-template/people/editAdvanceArchives',
    method: 'post'
  })
}
// 删除进修生档案信息
export function deleteAdvanceArchives(params) {
  return request({
    url: '/vue-admin-template/people/deleteAdvanceArchives',
    method: 'post'
  })
}

// 获取进修生排班列表信息
export function getAdvanceSchedule(params) {
  return request({
    url: '/vue-admin-template/people/getAdvanceSchedule',
    method: 'get',
    params
  })
}
// 添加进修生排班信息
export function addAdvanceSchedule(params) {
  return request({
    url: '/vue-admin-template/people/addAdvanceSchedule',
    method: 'post'
  })
}
// 修改进修生排班信息
export function editAdvanceSchedule(params) {
  return request({
    url: '/vue-admin-template/people/editAdvanceSchedule',
    method: 'post'
  })
}
// 删除进修生排班信息
export function deleteAdvanceSchedule(params) {
  return request({
    url: '/vue-admin-template/people/deleteAdvanceSchedule',
    method: 'post'
  })
}
// 获取进修生请假列表信息
export function getAdvanceLeave(params) {
  return request({
    url: '/vue-admin-template/people/getAdvanceLeave',
    method: 'get',
    params
  })
}
// 添加进修生请假信息
export function addAdvanceLeave(params) {
  return request({
    url: '/vue-admin-template/people/addAdvanceLeave',
    method: 'post'
  })
}
// 修改进修生请假信息
export function editAdvanceLeave(params) {
  return request({
    url: '/vue-admin-template/people/editAdvanceLeave',
    method: 'post'
  })
}
// 删除进修生请假信息
export function deleteAdvanceLeave(params) {
  return request({
    url: '/vue-admin-template/people/deleteAdvanceLeave',
    method: 'post'
  })
}
// 获取进修生轮转计划信息
export function getAdvancePlan(params) {
  return request({
    url: '/vue-admin-template/people/getAdvancePlan',
    method: 'get',
    params
  })
}
// 获取进修生轮转考核信息
export function getAdvanceAssess(params) {
  return request({
    url: '/vue-admin-template/people/getAdvanceAssess',
    method: 'get',
    params
  })
}
// 提交进修生评价科室表
export function postAdvanceEvaluate1(params) {
  return request({
    url: '/vue-admin-template/people/postAdvanceEvaluate1',
    method: 'post'
  })
}
// 提交科室评价进修生表
export function postAdvanceEvaluate2(params) {
  return request({
    url: '/vue-admin-template/people/postAdvanceEvaluate2',
    method: 'post'
  })
}
