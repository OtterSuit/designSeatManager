const Mock = require('mockjs')
const data = Mock.mock({
  items: {
    //   top
    'top|12': [
      {
        'college|+1': ['计算机学院', '经管学院', '音舞学院', '人文学院', '机电学院', '体育学院', '化工学院', '教育学院', '公管学院', '传播学院', '生科学院', '旅游学院'],
        registCount: '@Integer(200,800)'
      }
    ],
    seatSituation: [
      { value: 2000, name: '完好' },
      { value: 50, name: '损坏' }
    ],
    seatRealtime: [
      { value: 1856, name: '占座' },
      { value: 144, name: '空座' }
    ],
    'registCompare|12': [
      {
        'college|+1': ['计算机学院', '经管学院', '音舞学院', '人文学院', '机电学院', '体育学院', '化工学院', '教育学院', '公管学院', '传播学院', '生科学院', '旅游学院'],
        thisWeek: '@Integer(320,600)',
        lastWeek: '@Integer(320,600)',
        increase: '@float(-10,10)'
      }
    ],
    'floorCount|5': ['@Integer(200,300)']
  }
})
const url = '/vue-admin-template/dashboard/dashboard'
module.exports = [
  // 获取首页
  {
    url: url,
    type: 'get',
    response: config => {
      const items = data.items
      console.log(config.query)
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  }
]
