export default [
  {
    path: 'myInfo',
    name: 'MyInfo',
    component: () => import('@/views/systemSettings/myInfo'),
    meta: { title: '我的信息' }
  },
  {
    path: 'register',
    name: 'Register',
    component: () => import('@/views/systemSettings/register'),
    meta: { title: '账号设置' }
  },
  // {
  //   path: 'password',
  //   name: 'Password',
  //   component: () => import('@/views/systemSettings/password'),
  //   meta: { title: '修改密码' }
  // }
]
