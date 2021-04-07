// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import api from '@/api'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    identity: '',
    schoolId: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_IDENTITY: (state, identity) => {
    state.identity = identity
  },
  SET_SCHOOLID: (state, schoolId) => {
    state.schoolId = schoolId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      api.login({ school_id: username.trim(), password: password }).then(response => {
        const { token } = response
        commit('SET_TOKEN', token)
        setToken(token)
        const { identity } = jwt_decode(token)
        commit('SET_IDENTITY', identity)
        commit('SET_SCHOOLID', username)
        Cookies.set('Identity', identity)
        // api.getInfo().then(res => {
        //   console.log(res);
        // })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      api.getInfo().then(response => {
        const data = response
        if (!data) {
          return reject('认证错误，请重新登陆')
        }

        const { name, avatar, identity, school_id } = data

        console.log(name, avatar, identity)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_IDENTITY', identity)
        commit('SET_SCHOOLID', school_id)
        Cookies.set('Identity', identity)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    // return new Promise((resolve, reject) => {
    // logout(state.token).then(() => {
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')
    Cookies.remove('Identity')
    // resolve()
    // }).catch(error => {
    //   reject(error)
    // })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

