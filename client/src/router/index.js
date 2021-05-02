import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import systemSettings from './systemSettings'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/base',
    component: Layout,
    redirect: '/base/base',
    children: [
      {
        path: 'base',
        name: 'Base',
        component: () => import('@/views/base/index'),
        meta: { title: '基础数据', icon: 'iconpeiyao', identity: 'admin' }
      }
    ]
  },
  {
    path: '/registration',
    component: Layout,
    redirect: '/registration/registration',
    children: [
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('@/views/registration'),
        meta: { title: '人员登记', icon: 'icondengji', identity: 'admin' }
      }
    ]
  },
  {
    path: '/floor',
    component: Layout,
    redirect: '/floor/floor',
    children: [
      {
        path: 'floor',
        name: 'Floor',
        component: () => import('@/views/floor'),
        meta: { title: '楼层座位详情', icon: 'iconchuanci' }
      }
    ]
  },

  {
    path: '/seatManage',
    component: Layout,
    redirect: '/seatManage/seatManage',
    children: [
      {
        path: 'seatManage',
        name: 'SeatManage',
        component: () => import('@/views/seatManage'),
        meta: { title: '来选座', icon: 'iconzuowei' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/report',
    children: [
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/report'),
        meta: { title: '统计报表', icon: 'el-icon-s-data', identity: 'admin' }
      }
    ]
  },
  {
    path: '/reputation',
    component: Layout,
    redirect: '/reputation/rereputationport',
    children: [
      {
        path: 'reputation',
        name: 'Reputation',
        component: () => import('@/views/reputation'),
        meta: { title: '举报记录', icon: 'el-icon-s-data' }
      }
    ]
  },
  {
    path: '/systemSettings',
    component: Layout,
    redirect: '/systemSettings/myInfo',
    name: 'systemSettings',
    meta: { title: '系统设置', icon: 'lock' },
    hidden: true,
    children: [...systemSettings]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  console.log(constantRoutes)
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  console.log(router, newRouter)
}

export default router
