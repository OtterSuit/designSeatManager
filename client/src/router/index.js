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
    children: [
      {
        path: 'base',
        name: 'Base',
        component: () => import('@/views/base/index'),
        meta: { title: '基础数据', icon: 'iconpeiyao' }
      }
    ]
  },
  {
    path: '/registration',
    component: Layout,
    children: [
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('@/views/registration'),
        meta: { title: '人员登记', icon: 'icondengji' }
      }
    ]
  },
  {
    path: '/floor',
    component: Layout,
    children: [
      {
        path: 'floor',
        name: 'Floor',
        component: () => import('@/views/floor'),
        meta: { title: '楼层详情', icon: 'iconchuanci' }
      }
    ]
  },

  {
    path: '/seatManage',
    component: Layout,
    children: [
      {
        path: 'seatManage',
        name: 'SeatManage',
        component: () => import('@/views/seatManage'),
        meta: { title: '座位管理', icon: 'iconzuowei' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    children: [
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/report'),
        meta: { title: '统计报表', icon: 'el-icon-s-data' }
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
  {
    path: '/company',
    component: Layout,
    children: [
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/peiyao'),
        meta: { title: '配药', icon: 'iconpeiyao' }
      },
      {
        path: 'medicaldetail',
        name: 'medicaldetail',
        component: () => import('@/views/peiyao/medicaldetail.vue'),
        meta: { title: '配药详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/retrieve',
    component: Layout,
    children: [
      {
        path: 'retrieve',
        name: 'Retrieve',
        component: () => import('@/views/xunhui'),
        meta: { title: '巡回', icon: 'iconxunhui' }
      },
      {
        path: 'retrievedetail',
        name: 'retrievedetail',
        component: () => import('@/views/xunhui/retrievedetail'),
        meta: { title: '巡回详情', icon: 'iconxunhui' },
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router