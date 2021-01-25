const Mock = require('mockjs')

// 账号信息
const todo = Mock.mock({
  'items|431': [
    {
      name: '@cname',
      username: '@string("lower", 5, 8)',
      password: '@string("lower", 7, 10)'
    }]
})

module.exports = [
  // 账号信息
  {
    url: '/vue-admin-template/register/getRegister',
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
