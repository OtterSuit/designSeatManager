const Mock = require('mockjs')
const data = Mock.mock({
  items: [
    {
      'name': '@cname',
      'college|1': ['计算机学院', '经管学院', '音舞学院', '人文学院', '机电学院', '体育学院', '化工学院', '教育学院', '公管学院', '传播学院', '生科学院', '旅游学院'],
      'status|1': ['1', '2'],
      'identity': '@integer(17,21)' + '@integer(0000000,9999999)',
      'sex|1': ['男', '女'],
      'phone': '@integer(13,18)' + '@integer(000000000,999999999)',
      'seatNo|1': ['@Integer(0,99)', ''],
      'floor|1': ['五楼', '四楼', '三楼', '二楼', '一楼', ''],
      remark: '@cword(1, 5)'
    }
  ]
})
const url = '/vue-admin-template/registerInfo/registerInfo\.*'
module.exports = [
  // 获取座位
  {
    url: url,
    type: 'get',
    response: config => {
      const { idNumber } = config.query
      const items = data.items
      console.log(idNumber)
      if (idNumber === '111') {
        return {
          code: 20000,
          data: {
            items: items
          }
        }
      } else if (idNumber === '222') {
        return {
          code: 20000,
          data: {
            items: data.items
          }
        }
      }
    }
  }
]
