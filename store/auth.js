export const state = () => ({
  resource: [],
  permissions: [],
  alerts: [],
  role: null,
  id: null,
})

export const getters = {
  user: (state) => {
    return state.resource
  },
  alerts: (state) => {
    return state.alerts
  },
}

export const mutations = {
  STORE_PERMISSION(state, data) {
    state.permissions = data
  },
  STORE_ROLE(state, data) {
    state.role = data
  },
  SET_ID(state, data) {
    state.id = data._id
  },
  STORE_USER_INFO(state, data) {
    state.resource = data
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
          if (response.data.message.status === 1002) {
            commit('SET_ID', response.data.data)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  authenticate({ dispatch, commit, state }, { code }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/users/register/${state.id}`, {
          sms_code: code,
        })
        .then((res) => {
          localStorage.setItem('access_token', res.data.data.access_token)
          console.log(localStorage.getItem('access_token'))
          dispatch('fetchMe')
            .then((resp) => {
              resolve(resp)
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchMe({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('/user/me')
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
  logout({ commit }) {
    commit('STORE_USER_INFO', [])
    localStorage.removeItem('access_token')
  },
}
