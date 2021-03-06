import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const token = getToken()

  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      console.log(hasGetUserInfo)

      const { exp } = jwt_decode(token)
      const currentTime = Date.now() / 1000
      if (exp < currentTime) {
        await store.dispatch('user/resetToken')
        next({ path: '/login' })
        Message.error('登陆已过期，请重新登陆')
      } else {
        if (hasGetUserInfo) {
          if (to.meta.identity === 'admin' && store.getters.identity !== 'admin' && Cookies.get('Identity') !== 'admin') {
            next({ path: '/404' })
          }
          next()
        } else {
          try {
            // get user info
            const user = await store.dispatch('user/getInfo')
            if (to.meta.identity === 'admin' && user.identity !== 'admin' && Cookies.get('Identity') !== 'admin') {
              next({ path: '/404' })
            }
            next()
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
