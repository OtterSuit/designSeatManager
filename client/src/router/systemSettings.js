export default [
  {
    path: 'myInfo',
    name: 'MyInfo',
    component: () => import('@/views/systemSettings/myInfo'),
    meta: { title: '我的信息' }
  },
  {
    path: 'myTodo',
    name: 'MyTodo',
    component: () => import('@/views/systemSettings/myTodo'),
    meta: { title: '我的待办' }
  },
  {
    path: 'purview',
    name: 'Purview',
    component: () => import('@/views/systemSettings/purview'),
    meta: { title: '权限管理' }
  },
  {
    path: 'register',
    name: 'Register',
    component: () => import('@/views/systemSettings/register'),
    meta: { title: '账号设置' }
  }
]
