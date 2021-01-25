const Mock = require('mockjs')
const data = Mock.mock({
  'items|30-50': [
    {
      'name|+1': 1,
      'studentName|1': ['', '@cname'],
      'status|1': ['1', '2'],
      endDate: '@datetime',
      remark: '@cword(1, 5)'
    }
  ],
  'itemss|30-50': [
    {
      'name|+1': 1,
      'studentName|1': ['', '@cname'],
      'status|1': ['1', '2', '3'],
      endDate: '@datetime',
      remark: '@cword(1, 5)'
    }
  ],
  'itemforThird|30-50': [
    {
      'name|+1': 1,
      'studentName|1': ['', '@cname'],
      'status|1': ['1', '2'],
      endDate: '@datetime',
      remark: '@cword(1, 5)'
    }
  ],
  'itemforFord|30-50': [
    {
      'name|+1': 1,
      'studentName|1': ['', '@cname'],
      'status|1': ['1', '2'],
      endDate: '@datetime',
      remark: '@cword(1, 5)'
    }
  ],
  'itemforFif|30-50': [
    {
      'name|+1': 1,
      'studentName|1': ['', '@cname'],
      'status|1': ['1', '2'],
      endDate: '@datetime',
      remark: '@cword(1, 5)'
    }
  ]

})
const url = '/vue-admin-template/seat/seatList\.*'
module.exports = [
  // 获取座位
  {
    url: url,
    type: 'get',
    response: config => {
      const { a } = config.query
      const items = data.items
      console.log(a)
      if (a === '一楼') {
        return {
          code: 20000,
          data: {
            items: items
          }
        }
      } else if (a === '二楼') {
        return {
          code: 20000,
          data: {
            items: data.itemss
          }
        }
      } else if (a === '三楼') {
        return {
          code: 20000,
          data: {
            items: data.itemforThird
          }
        }
      } else if (a === '四楼') {
        return {
          code: 20000,
          data: {
            items: data.itemforFord
          }
        }
      } else if (a === '五楼') {
        return {
          code: 20000,
          data: {
            items: data.itemforFif
          }
        }
      }
    }
  }
]
