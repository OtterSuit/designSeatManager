const Mock = require('mockjs')

// 人员
const data = Mock.mock({
  items: {
    'peopleMessage|40': [
      {
        'id|1': '@integer(17,21)' + '@integer(0000,9999)' + '@integer(0,999)',
        'name': '@cname',
        'identity|1': ['1', '2'],
        'college|1': ['计算机学院', '经管学院', '音舞学院', '人文学院', '机电学院', '体育学院', '化工学院', '教育学院', '公管学院', '传播学院', '生科学院', '旅游学院'],
        remark: '@cparagraph(1)'
      }
    ]
  },
  seatItem: {
    'seatMessage|100': [
      {
        'id|+1': 1,
        'floor|1': ['五楼', '四楼', '三楼', '二楼', '一楼'],
        'remark|1': ['损坏', '正常']
      }
    ]
  }
})

module.exports = [
  // 人员
  {
    url: '/baseData/people',
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
  },
  //  座位
  {
    url: '/baseData/seat',
    type: 'get',
    response: config => {
      const items = data.seatItem
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
