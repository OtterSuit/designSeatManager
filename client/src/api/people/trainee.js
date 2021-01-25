import request from '@/utils/request'

// 获取实习生档案列表信息
export function getTraineeArchives(params) {
  return request({
    url: '/vue-admin-template/people/getTraineeArchives',
    method: 'get',
    params
  })
}
// 添加实习生档案信息
export function addTraineeArchives(params) {
  return request({
    url: '/vue-admin-template/people/addTraineeArchives',
    method: 'post'
  })
}
// 修改实习生档案信息
export function editTraineeArchives(params) {
  return request({
    url: '/vue-admin-template/people/editTraineeArchives',
    method: 'post'
  })
}
// 删除实习生档案信息
export function deleteTraineeArchives(params) {
  return request({
    url: '/vue-admin-template/people/deleteTraineeArchives',
    method: 'post'
  })
}

// 获取实习生排班列表信息
export function getTraineeSchedule(params) {
  return request({
    url: '/vue-admin-template/people/getTraineeSchedule',
    method: 'get',
    params
  })
}
// 添加实习生排班信息
export function addTraineeSchedule(params) {
  return request({
    url: '/vue-admin-template/people/addTraineeSchedule',
    method: 'post'
  })
}
// 修改实习生排班信息
export function editTraineeSchedule(params) {
  return request({
    url: '/vue-admin-template/people/editTraineeSchedule',
    method: 'post'
  })
}
// 删除实习生排班信息
export function deleteTraineeSchedule(params) {
  return request({
    url: '/vue-admin-template/people/deleteTraineeSchedule',
    method: 'post'
  })
}
// 获取实习生请假列表信息
export function getTraineeLeave(params) {
  return request({
    url: '/vue-admin-template/people/getTraineeLeave',
    method: 'get',
    params
  })
}
// 添加实习生请假信息
export function addTraineeLeave(params) {
  return request({
    url: '/vue-admin-template/people/addTraineeLeave',
    method: 'post'
  })
}
// 修改实习生请假信息
export function editTraineeLeave(params) {
  return request({
    url: '/vue-admin-template/people/editTraineeLeave',
    method: 'post'
  })
}
// 删除实习生请假信息
export function deleteTraineeLeave(params) {
  return request({
    url: '/vue-admin-template/people/deleteTraineeLeave',
    method: 'post'
  })
}
// 获取实习生轮转计划信息
export function getTraineePlan(params) {
  return request({
    url: '/vue-admin-template/people/getTraineePlan',
    method: 'get',
    params
  })
}
// 获取实习生轮转考核信息
export function getTraineeAssess(params) {
  return request({
    url: '/vue-admin-template/people/getTraineeAssess',
    method: 'get',
    params
  })
}
// 提交实习生评价科室表
export function postTraineeEvaluate1(params) {
  return request({
    url: '/vue-admin-template/people/postTraineeEvaluate1',
    method: 'post'
  })
}
// 提交科室评价实习生表
export function postTraineeEvaluate2(params) {
  return request({
    url: '/vue-admin-template/people/postTraineeEvaluate2',
    method: 'post'
  })
}
