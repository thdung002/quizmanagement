import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getRole, setRole, removeRole } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role:''
  }
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE:(state,role)=>{
    state.role = role
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response;
        commit('SET_TOKEN', data[0].Id);
        commit('SET_ROLE',data[0].Role);
        setRole(data[0].Role);
        setToken(data[0].Id);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response;

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_NAME', data[0].Fullname);
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif');
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken(); // must remove  token  first
      removeRole();
      resetRouter();
      logout();
      commit('RESET_STATE');
      resolve()

    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      removeRole();
      commit('RESET_STATE');
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

