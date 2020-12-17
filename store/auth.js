import Cookie from 'js-cookie'
export const state = () => ({
  resource: [],
  permissions: [],
  alerts: [],
  role: null,
  token: null,
})

export const mutations = {
  STORE_PERMISSION(state, data) {
    state.permissions = data
  },
  STORE_ROLE(state, data) {
    state.role = data
  },
  STORE_USER_INFO(state, data) {
    state.resource = data
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  UPDATE_USER_INFO(state, data) {
    // eslint-disable-next-line
    _.each(data, (item, key) => {
      state.resource[key] = item
    })
  },
}

export const actions = {
  loginInit({ commit }, { mobileNumber }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/users/register', {
          params: {
            mobile_number: mobileNumber,
          },
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  authenticate({ dispatch, commit, state }, { code, id }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/users/register/${id}`, {
          sms_code: code,
        })
        .then((res) => {
          resolve(res)
          const token = res.data.data.access_token
          localStorage.setItem('access_token', token)
          Cookie.set('token', token)
          commit('SET_TOKEN', token)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchMe({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      if (process.client) {
        this.$axios.setToken(localStorage.getItem('access_token'), 'Bearer')
      }
      this.$axios
        .get('/users/me')
        .then((response) => {
          const data = response.data.data
          commit('STORE_USER_INFO', data)
          resolve(response)
          commit('STORE_ROLE', data.role)
          window.localStorage.setItem('role', JSON.stringify(data.role))
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit, state }) {
    commit('SET_TOKEN', null)
    Cookie.remove('token')
    localStorage.removeItem('access_token')
  },
}

export const getters = {
  user(state) {
    return state.resource
  },
  alerts(state) {
    return state.alerts
  },
  clientSideIsAuthenticated(state) {
    return state.token != null
  },
}
