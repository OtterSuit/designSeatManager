const Mock = require('mockjs')

const data = Mock.mock({
  'items|153': [
    {
      id: '@id',
      name: '@cname',
      date: '@date',
      'Odepartment|1': ['内科', '外科', '儿科', '妇科', '眼科'],
      'Ndepartment|1': ['耳鼻咽喉科', '产科', '皮肤科', '男科', '传染科'],
      'Opost|1': ['护士', '护士长', '护理部主任'],
      'Npost|1': ['护士', '护士长', '护理部主任'],
      certifier: '@cname',
      phone: /^1[3456789]\d{9}$/
    }]
})

module.exports = [
  // 获取信息变动列表信息
  {
    url: '/vue-admin-template/people/getInfoChange',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 添加信息变动信息
  {
    url: '/vue-admin-template/people/addInfoChange',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 修改信息变动信息
  {
    url: '/vue-admin-template/people/editInfoChange',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 删除信息变动信息
  {
    url: '/vue-admin-template/people/deleteInfoChange',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }
]
