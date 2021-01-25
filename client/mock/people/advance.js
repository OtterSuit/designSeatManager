const Mock = require('mockjs')

const archives = Mock.mock({
  'items|453': [
    {
      id: '@id',
      name: '@cname',
      'unit|1': ['腾讯', '阿里巴巴', '字节跳动', '百度'],
      'career|1': ['护理学', '软件工程', '管理学', '经济学'],
      address: '@county(true)',
      'describe|1': ['医疗', '互联网', '硬件', '经济'],
      principal: '@cname',
      enrollment: '@date',
      leaveTime: '@date',
      'education|1': ['专科', '本科', '硕士', '博士'],
      'degree|1': ['工科', '理科', '文科']
    }]
})

const schedule = Mock.mock({
  'items|10': [
    {
      name: '@cname',
      jobNum: /\d{5}/,
      'group|1': ['1组', '2组', '3组', '4组', '5组', '6组', '7组'],
      'Mon|1': ['A班', 'P班', 'N班', '责任班', '医嘱班', '机动班', '休息', '请假'],
      'Tues|1': ['A班', 'P班', 'N班', '责任班', '医嘱班', '机动班', '休息', '请假'],
      'Wed|1': ['A班', 'P班', 'N班', '责任班', '医嘱班', '机动班', '休息', '请假'],
      'Thurs|1': ['A班', 'P班', 'N班', '责任班', '医嘱班', '机动班', '休息', '请假'],
      'Fri|1': ['A班', 'P班', 'N班', '责任班', '医嘱班', '机动班', '休息', '请假'],
      'Sat|1': ['A班', 'P班', 'N班', '责任班', '医嘱班', '机动班', '休息', '请假'],
      'Sun|1': ['A班', 'P班', 'N班', '责任班', '医嘱班', '机动班', '休息', '请假'],
      'night|1-3': 3,
      'duration|30-50.1': 30,
      remark: ''
    }]
})
const leave = Mock.mock({
  'items|786': [
    {
      name: '@cname',
      startDate: '@datetime',
      endDate: '@datetime',
      'long|9-45': 45,
      'type|1': ['病假', '婚假', '产假', '陪产假', '事假', '丧假', '其他'],
      reason: '@cword(3, 5)'
    }]
})
// 轮转计划
const plan = Mock.mock({
  'items|10': [
    {
      name: '@cname',
      'department|5': [{
        startTime: '@date',
        endTime: '@date',
        teacher: '@cname'
      }],
      state: '@cword(3, 5)'
    }]
})
// 轮转考核
const assess = Mock.mock({
  'items|10': [
    {
      name: '@cname',
      'department|5': [{
        time: '@date',
        teacher: '@cname'
      }],
      state: '@cword(3, 5)'
    }]
})

module.exports = [
  // 获取进修生档案列表信息
  {
    url: '/vue-admin-template/people/getAdvanceArchives',
    type: 'get',
    response: config => {
      const items = archives.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 添加进修生档案信息
  {
    url: '/vue-admin-template/people/addAdvanceArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 修改进修生档案信息
  {
    url: '/vue-admin-template/people/editAdvanceArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 删除进修生档案信息
  {
    url: '/vue-admin-template/people/deleteAdvanceArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取进修生排班列表信息
  {
    url: '/vue-admin-template/people/getAdvanceSchedule',
    type: 'get',
    response: config => {
      const items = schedule.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 添加进修生排班信息
  {
    url: '/vue-admin-template/people/addAdvanceSchedule',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 修改进修生排班信息
  {
    url: '/vue-admin-template/people/editAdvanceSchedule',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 删除进修生排班信息
  {
    url: '/vue-admin-template/people/deleteAdvanceSchedule',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取进修生请假列表信息
  {
    url: '/vue-admin-template/people/getAdvanceLeave',
    type: 'get',
    response: config => {
      const items = leave.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 添加进修生请假信息
  {
    url: '/vue-admin-template/people/addAdvanceLeave',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 修改进修生请假信息
  {
    url: '/vue-admin-template/people/editAdvanceLeave',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 删除进修生请假信息
  {
    url: '/vue-admin-template/people/deleteAdvanceLeave',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取进修生轮转计划信息
  {
    url: '/vue-admin-template/people/getAdvancePlan',
    type: 'get',
    response: config => {
      const items = plan.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 获取进修生轮转考核信息
  {
    url: '/vue-admin-template/people/getAdvanceAssess',
    type: 'get',
    response: config => {
      const items = assess.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 提交进修生评价科室表
  {
    url: '/vue-admin-template/people/postAdvanceEvaluate1',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 提交科室评价进修生表
  {
    url: '/vue-admin-template/people/postAdvanceEvaluate2',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }
]
