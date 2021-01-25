const Mock = require('mockjs')

// 代办信息
const todo = Mock.mock({
  'item|1-3': {
    '0': {
      title: 'A1按铃',
      description: 'A1患者按铃求助！',
      type: 'success'
    },
    '1': {
      title: 'A2按铃',
      description: 'A2患者按铃求助！',
      type: 'error'
    },
    '2': {
      title: 'A6按铃',
      description: 'A6患者按铃求助！',
      type: 'warning'
    }
  },
  'items': function() {
    return Object.values(this.item)
  }
})

module.exports = [
  // 代办信息
  {
    url: '/vue-admin-template/todo/getTodo',
    type: 'get',
    response: config => {
      const items = todo.items
      return {
        code: 20000,
        data: {
          items: items,
          total: items.length
        }
      }
    }
  }
]
