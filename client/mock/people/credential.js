const Mock = require('mockjs')

const data = Mock.mock({
  qualification: {
    id: '@id',
    recordDate: '@date',
    indate: '@date'
  },
  execute: {
    id: '@id',
    recordDate: '@date',
    indate: '@date',
    code: /\d{9}/
  },
  midwife: {
    id: '@id',
    recordDate: '@date',
    indate: '@date',
    code: /\d{9}/
  },
  other: {
    id: '@id',
    'name|1': ['普通话等级证书', '营养师证', '计算机证'],
    recordDate: '@date',
    indate: '@date',
    code: /\d{9}/
  }
})

module.exports = [
  // 获取资格证书
  {
    url: '/vue-admin-template/people/getQualification',
    type: 'get',
    response: config => {
      const items = data.qualification
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  },
  // 提交资格证书
  {
    url: '/vue-admin-template/people/postQualification',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取执行证书
  {
    url: '/vue-admin-template/people/getExecute',
    type: 'get',
    response: config => {
      const items = data.execute
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  },
  // 提交执行证书
  {
    url: '/vue-admin-template/people/postExecute',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取助产证
  {
    url: '/vue-admin-template/people/getMidwife',
    type: 'get',
    response: config => {
      const items = data.midwife
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  },
  // 提交助产证
  {
    url: '/vue-admin-template/people/postMidwife',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取其他证书
  {
    url: '/vue-admin-template/people/getOther',
    type: 'get',
    response: config => {
      const items = data.other
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  },
  // 提交其他证书
  {
    url: '/vue-admin-template/people/postOther',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }
]
