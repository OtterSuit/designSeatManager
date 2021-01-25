const Mock = require('mockjs')

const data = Mock.mock({
  'items|194': [
    {
      id: '@id',
      date: '@date',
      'state|1': ['1', '2', '3'],
      user: {
        name: '@cname',
        'gender|1': ['男', '女'],
        'politics|1': ['群众', '共青团员', '中共党员'],
        phone: /^1[3456789]\d{9}$/,
        'nation|1': ['汉族', '傣族', '壮族', '藏族'],
        email: '@email',
        idCard: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        'marriage|1': ['已婚', '未婚', '已婚已育'],
        'speciality|1': ['篮球', '钢琴', '吉他', '摄影'],
        'hobby|1': ['跑步', '瑜伽', '编程', '唱歌'],
        native: '@city(true)',
        address: '@county(true)'
      },
      body: {
        'tall|140-200': 200,
        'weight|70-200': 200,
        'size|1': ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        'health|1': ['健康', '一般', '较差', '伤残', '其他'],
        'footsize|36-44': 40
      },
      urgency: {
        urgency: '@cname',
        urgencyPhone: /^1[3456789]\d{9}$/,
        'urgencyRelation|1': ['夫妻', '父子', '母子', '祖孙']
      },
      work: {
        num: /\d{9}/,
        'duty|1': ['护士', '护士长', '护理部主任'],
        'employment|1': ['合同', '临时工', '非全日制用工'],
        workTime: '@date("yyyy.MM")',
        'area|1': ['一区', '二区', '三区', '四区'],
        'office|1': ['护理（士）', '护理（师）', '主管护理（师）'],
        'type|1': ['在职人员', '实习生', '进修生'],
        'seniority|1-30': 30
      },
      'workExp|1-3': [
        {
          key: /[a-z][A-Z][0-9]/,
          'unitName|1': ['中山三院', '广东省人民医院', '广州黄埔区人民医院', '鱼珠诊所'],
          'duty|1': ['护士', '护士长', '护理部主任'],
          'department|1': ['内科', '外科', '儿科', '妇科', '牙科'],
          enterTime: '@date("yyyy.MM")',
          leaveTime: '@date("yyyy.MM")'
        }
      ],
      'edu|1-3': [
        {
          key: /[a-z][A-Z][0-9]/,
          'schoolName|1': ['清华大学', '北京大学', '哈佛大学', '麻省理工大学'],
          'career|1': ['护理学', '软件工程', '管理学', '经济学'],
          'education|+1': ['博士', '硕士', '本科', '专科'],
          enrollment: '@date("yyyy.MM")',
          leaveTime: '@date("yyyy.MM")',
          'systme|1': ['全日制', '专升本', '自考', '网络教育'],
          'ifHeight|+1': ['是', '否', '否', '否']
        }
      ],
      'skill|1-3': [
        {
          key: /[a-z][A-Z][0-9]/,
          'certificateName|1': ['资格证书', '执行证书', '助产证'],
          'level|1': ['初级', '中级', '高级'],
          getTime: '@date("yyyy.MM")',
          failTime: '@date("yyyy.MM")'
        }
      ],
      'language|1-3': [
        {
          key: /[A-Z][a-z][0-9]/,
          'language|1|1': ['英语', '法语', '德语'],
          'credential|1': ['四级', '六级', '专业八级'],
          'readWrite|1': ['精通', '熟练', '一般', '较差'],
          'apply|1': ['精通', '熟练', '一般', '较差']
        }
      ],
      computer: {
        'level|1': ['一级', '二级', '三级', '四级']
      },
      credit: {
        ICnum: /\d{9}/,
        'existingNum|100-200': 200,
        'balance|0-20': 20
      }
    }]
})

module.exports = [
  // 获取用户个人档案
  {
    url: '/vue-admin-template/people/userArchives',
    type: 'get',
    response: config => {
      const items = data.items[0]
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  },
  // 人员管理模块-档案状态列表信息
  {
    url: '/vue-admin-template/people/archivesList',
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
  // 提交人员管理模块档案信息
  {
    url: '/vue-admin-template/people/postArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 人员管理模块-档案状态通过
  {
    url: '/vue-admin-template/people/passArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 人员管理模块-档案状态驳回
  {
    url: '/vue-admin-template/people/rejectArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 人员管理模块-档案状态删除
  {
    url: '/vue-admin-template/people/deleteArchives',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }
]
