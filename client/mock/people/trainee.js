const Mock = require('mockjs')
// 档案
const archives = Mock.mock({
  'items|45': [
    {
      id: '@id',
      name: '@cname',
      'school|1': ['清华大学', '北京大学', '哈佛大学', '麻省理工大学'],
      'career|1': ['护理学', '软件工程', '管理学', '经济学'],
      enrollment: '@date',
      leaveTime: '@date',
      'specialty|1': ['医学院', '数学与信息学院', '公共管理学院', '马克思主义学院'],
      'education|1': ['专科', '本科', '硕士', '博士'],
      'degree|1': ['工科', '理科', '文科']
    }]
})
// 排班
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
// 请假
const leave = Mock.mock({
  'items|77': [
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
  // 获取实习生档案列表信息
  {
    url: '/vue-admin-template/people/getTraineeArchives',
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
  // 添加实习生档案信息
  {
    url: '/vue-admin-template/people/addTraineeArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 修改实习生档案信息
  {
    url: '/vue-admin-template/people/editTraineeArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 删除实习生档案信息
  {
    url: '/vue-admin-template/people/deleteTraineeArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },

  // 获取实习生排班列表信息
  {
    url: '/vue-admin-template/people/getTraineeSchedule',
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
  // 添加实习生排班信息
  {
    url: '/vue-admin-template/people/addTraineeSchedule',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 修改实习生排班信息
  {
    url: '/vue-admin-template/people/editTraineeSchedule',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 删除实习生排班信息
  {
    url: '/vue-admin-template/people/deleteTraineeSchedule',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取实习生请假列表信息
  {
    url: '/vue-admin-template/people/getTraineeLeave',
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
  // 添加实习生请假信息
  {
    url: '/vue-admin-template/people/addTraineeLeave',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 修改实习生请假信息
  {
    url: '/vue-admin-template/people/editTraineeLeave',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 删除实习生请假信息
  {
    url: '/vue-admin-template/people/deleteTraineeLeave',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取实习生轮转计划信息
  {
    url: '/vue-admin-template/people/getTraineePlan',
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
  // 获取实习生轮转考核信息
  {
    url: '/vue-admin-template/people/getTraineeAssess',
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
  // 提交实习生评价科室表
  {
    url: '/vue-admin-template/people/postTraineeEvaluate1',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 提交科室评价实习生表
  {
    url: '/vue-admin-template/people/postTraineeEvaluate2',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }
]
