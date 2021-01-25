const Mock = require('mockjs')

// 患者信息
const patient = Mock.mock({
  'items|987': [
    {
      id: '@id',
      name: '@cname',
      'gender|1': ['男', '女'],
      'age|18-80': 80,
      diagnose: '@cword(3, 7)',
      'department|1': ['内科', '外科', '儿科', '妇科', '男科', '耳科'],
      bedNum: /\d{5}/,
      hospitalNum: /\d{5}/,
      date: '@date',
      'way|1': ['步行', '轮椅', '扶入', '平车']
    }]
})

// const fallAssessment = Mock.mock({
//   'items|20': [
//     {
//       id: '@id',
//       name: '@cname',
//       'gender|1': ['男', '女'],
//       'age|18-80': 80,
//       diagnose: '@cword(3, 7)',
//       'department|1': ['内科', '外科', '儿科', '妇科', '男科', '耳科'],
//       bedNum: /\d{5}/,
//       hospitalNum: /\d{5}/,
//       time: '@date',
//       people: '@cname',
//       'assess1|1': ['0', '1'],
//       'assess2|1': ['0', '1'],
//       'assess3|1': ['0', '1'],
//       'assess4|1': ['0', '1'],
//       'assess5|1': ['0', '1'],
//       'assess6|1': ['0', '1'],
//       'assess7|1': ['0', '1'],
//       'assess8|1': ['0', '1'],
//       'state|1': ['1', '2', '3']
//     }]
// })
// const admissionAssessment = Mock.mock({
//   'items|20': [
//     {
//       id: '@id',
//       name: '@cname',
//       'gender|1': ['男', '女'],
//       'age|18-80': 80,
//       'department|1': ['内科', '外科', '儿科', '妇科', '男科', '耳科'],
//       bedNum: /\d{5}/,
//       hospitalNum: /\d{5}/,
//       occupation: '@cword(3)',
//       'culture|1': ['小学', '初中', '高中', '专科', '本科', '硕士', '博士'],
//       date: '@date',
//       diagnose: '@cword(3, 7)',
//       time: '@date',
//       people: '@cname',
//       'state|1': ['1', '2', '3'],
//       'radio1|1': ['1', '2'],
//       'radio2|1': ['1', '2', '3', '4'],
//       'radio3|1': ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
//       'radio4|1': ['1', '2', '3'],
//       'radio5|1': ['1', '2'],
//       'radio6|1': ['1', '2'],
//       'radio7|1': ['1', '2', '3'],
//       'radio8|1': ['1', '2'],
//       'radio9|1': ['1', '2'],
//       'radio10|1': ['1', '2'],
//       'radio11|1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
//       'radio12|1': ['1', '2', '3', '4', '5', '6'],
//       'radio13|1': ['1', '2'],
//       'radio14|1': ['1', '2', '3', '4', '5'],
//       'radio15|1': ['1', '2', '3'],
//       'radio16|1': ['1', '2'],
//       'radio17|1': ['1', '2'],
//       'radio18|1': ['1', '2', '3'],
//       'radio19|1': ['1', '2'],
//       'radio20|1': ['1', '2'],
//       'radio21|1': ['1', '2'],
//       'radio22|1': ['1', '2', '3'],
//       'checkboxObj1|1-8': { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8' },
//       'checkbox1': function() {
//         return Object.values(this.checkboxObj1)
//       },
//       'checkboxObj2|1-8': { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8' },
//       'checkbox2': function() {
//         return Object.values(this.checkboxObj1)
//       },
//       'detail1|1': '@cword(3, 7)',
//       'detail2|1': '@cword(3, 7)',
//       'detail3|1': '@cword(3, 7)',
//       'detail4|1': '@cword(3, 7)',
//       'detail5|1-10': 10,
//       'detail6|1-3': 3,
//       'detail7|1': '@cword(3, 7)',
//       'detail8|1': '@cword(3, 7)',
//       'detail9|1': '@cword(3, 7)',
//       'detail10|1': '@cword(3, 7)',
//       'detail11|1': '@cword(3, 7)',
//       'detail12|1': '@cword(3, 7)',
//       'detail13|1': '@cword(3, 7)',
//       'detail14|1': '@cword(3, 7)',
//       'detail15|1-10': 10,
//       'detail16|1': '@cword(3, 7)',
//       'point1|1': ['1', '2', '3', '4'],
//       'point2|1': ['1', '2', '3', '4'],
//       'point3|1': ['1', '2', '3', '4'],
//       'point4|1': ['1', '2', '3', '4'],
//       'point5|1': ['1', '2', '3', '4'],
//       'point6|1': ['1', '2', '3']
//     }]
// })

module.exports = [
  // 获取患者列表信息
  {
    url: '/vue-admin-template/recordInstrument/getPatient',
    type: 'get',
    response: config => {
      const items = patient.items
      return {
        code: 20000,
        data: {
          items: items,
          total: items.length
        }
      }
    }
  }
  // 获取入院评估
  // {
  //   url: '/vue-admin-template/recordInstrument/getFallAssessment',
  //   type: 'get',
  //   response: config => {
  //     const items = fallAssessment.items
  //     return {
  //       code: 20000,
  //       data: {
  //         items: items
  //       }
  //     }
  //   }
  // },
  // 获取跌倒风险评估
  // {
  //   url: '/vue-admin-template/recordInstrument/getAdmissionAssessment',
  //   type: 'get',
  //   response: config => {
  //     const items = admissionAssessment.items
  //     return {
  //       code: 20000,
  //       data: {
  //         items: items
  //       }
  //     }
  //   }
  // }
]
