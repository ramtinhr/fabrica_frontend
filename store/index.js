/* eslint-disable */
import CookieParser from "cookieparser";

export const state = () => ({
  limit: 10,
  category: null,
  state: null,
  token: null,
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  ADD_DATA(rootState, { storeName, resourceName, data }) {
    if (resourceName) {
      rootState[storeName].resource[resourceName].data.push(...data)
      rootState[storeName].requesting = false
    } else {
      rootState[storeName].resource.data.push(...data)
      rootState[storeName].requesting = false
    }
  },
  EMPTY_DATA(rootState, { storeName, resourceName }) {
    if (resourceName) {
      rootState[storeName].resource[resourceName].data = []
    } else {
      rootState[storeName].resource.data = []
      rootState[storeName].requesting = false
    }
  },
  FILL(rootState, { storeName, resourceName, data, pagination }) {
    if (resourceName) {
      rootState[storeName].resource[resourceName].data = data
      rootState[storeName].resource[resourceName].pagination = pagination
      rootState[storeName].resource[resourceName].loading = false
    } else {
      rootState[storeName].resource.data = data
      rootState[storeName].resource.pagination = pagination
      rootState[storeName].resource.loading = false
    }
  },
  UPDATE_ITEM(rootState, { storeName, resourceName, filter, set }) {
    if (resourceName) {
      if (
        _.findIndex(
          rootState[storeName].resource[resourceName].data,
          filter
        ) !== -1
      ) {
        rootState[storeName].resource[resourceName].data = _.map(
          rootState[storeName].resource[resourceName].data,
          (item) => {
            if (filter(item)) {
              return set(item)
            }

            return item
          }
        )
      } else {
        rootState[storeName].resource[resourceName].data.push(set(null))
      }
    } else if (_.findIndex(rootState[storeName].resource.data, filter) !== -1) {
      rootState[storeName].resource.data = _.map(
        rootState[storeName].resource.data,
        (item) => {
          if (filter(item)) {
            return set(item)
          }

          return item
        }
      )
    } else {
      rootState[storeName].resource.data.push(set(null))
    }
  },
  SELECT_CATEGORY(state, payload) {
    state.category = payload.category
  },
  SELECT_STATE(state, payload) {
    state.state = payload.state
  },
  UPDATE_ITEM_FIELDS(rootState, { storeName, resourceName, filter, data }) {
    if (resourceName) {
      if (
        _.findIndex(
          rootState[storeName].resource[resourceName].data,
          filter
        ) !== -1
      ) {
        const item =
          _.find(rootState[storeName].resource[resourceName].data, filter) || {}
        _.each(item, function (v, i) {
          if (data[i] !== undefined) {
            item[i] = data[i]
          }
        })
      }
    } else if (_.findIndex(rootState[storeName].resource.data, filter) !== -1) {
      const item = _.find(rootState[storeName].resource.data, filter) || {}
      _.each(item, function (v, i) {
        if (data[i] !== undefined) {
          item[i] = data[i]
        }
      })
    }
  },
  REMOVE_ITEM(rootState, { storeName, resourceName, filter }) {
    if (resourceName) {
      rootState[storeName].resource[resourceName].data = _.filter(
        rootState[storeName].resource[resourceName].data,
        (item) => {
          return !filter(item)
        }
      )
    } else {
      rootState[storeName].resource.data = _.filter(
        rootState[storeName].resource.data,
        (item) => {
          return !filter(item)
        }
      )
    }
  },
  INCREASE_OFFSET(rootState, { storeName, resourceName, offset }) {
    if (resourceName) {
      rootState[storeName].resource[resourceName].offset = offset
    } else {
      rootState[storeName].resource.offset = offset
    }
  },
  REQUESTING(rootState, { storeName }) {
    rootState[storeName].requesting = true
  },
  LOADING(rootState, { storeName, resourceName }) {
    if (resourceName) {
      rootState[storeName].resource[resourceName].loading = true
    } else {
      rootState[storeName].resource.loading = true
    }
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const cookies = CookieParser.parse(req.headers.cookie)
    const token = cookies['token']
    commit('SET_TOKEN', token)
  },
  fill({ commit }, { storeName, resourceName, data, pagination }) {
    commit('FILL', { storeName, resourceName, data, pagination })
  },
  add({ commit }, { storeName, resourceName, data }) {
    commit('ADD_DATA', { storeName, resourceName, data })
  },
  update({ commit }, { storeName, resourceName, filter, set }) {
    commit('UPDATE_ITEM', { storeName, resourceName, filter, set })
  },
  updateFields({ commit }, { storeName, resourceName, filter, data }) {
    commit('UPDATE_ITEM_FIELDS', { storeName, resourceName, filter, data })
  },
  remove({ commit }, { storeName, resourceName, filter }) {
    commit('REMOVE_ITEM', { storeName, resourceName, filter })
  },
  //  Requests
  get(
    { commit },
    { storeName = null, resourceName, fillData = true, url, config }
  ) {
    if (storeName) {
      commit('LOADING', { storeName, resourceName })
    }
    return new Promise((resolve, reject) => {
      this.$axios
        .get(url, config)
        .then((response) => {
          if (storeName && fillData) {
            commit('FILL', {
              storeName,
              resourceName,
              data: response.data.data,
            })
          } else if (storeName && !fillData) {
            commit('FILL', {
              storeName,
              resourceName,
              data: response.data,
            })
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  post({ state, commit }, { url, data, config }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(url, data, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  put({ state, commit }, { url, data, config }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(url, data, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  lazyLoad(
    { rootState, commit },
    { storeName, resourceName, url, page, limit = null, params }
  ) {
    commit('REQUESTING', { storeName, resourceName })
    return new Promise((resolve, reject) => {
      if (resourceName) {
        params.offset =
          (page - 1) * rootState[storeName].resource[resourceName].limit
      } else {
        params.offset = (page - 1) * rootState[storeName].resource.limit
      }
      if (limit) {
        params.limit = limit
      } else if (resourceName) {
        params.limit = rootState[storeName].resource[resourceName].limit
      } else {
        params.limit = rootState[storeName].resource.limit
      }
      this.$axios
        .get(url, { params })
        .then((response) => {
          commit('INCREASE_OFFSET', {
            storeName,
            resourceName,
            offset: params.offset,
          })
          commit('ADD_DATA', {
            storeName,
            resourceName,
            data: response.data.data,
          })
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          rootState[storeName].requesting = false
        })
    })
  },
  paginate(
    { rootState, commit },
    { storeName, resourceName, url, page, limit = null, params }
  ) {
    commit('LOADING', { storeName, resourceName })
    return new Promise((resolve, reject) => {
      params.offset = (page - 1) * rootState.limit
      if (limit) {
        params.limit = limit
      } else {
        params.limit = rootState.limit
      }
      this.$axios
        .get(url, { params })
        .then((response) => {
          commit('FILL', {
            storeName,
            resourceName,
            data: response.data.data,
            pagination: response.data.meta.pagination,
          })
          commit('INCREASE_OFFSET', {
            storeName,
            resourceName,
            offset: params.offset,
          })
          resolve(response)
        })
        .catch((error) => {
          rootState[storeName].resource.loading = false
          reject(error)
        })
    })
  },
}

export const getters = {
  isLoading: (rootState) => (storeName, resourceName = null) => {
    if (storeName === 'application') {
      return rootState[storeName].loading
    }
    if (resourceName) {
      return rootState[storeName].resource[resourceName].loading
    } else {
      return rootState[storeName].resource.loading
    }
  },
  getSelectedCategory: (state) => {
    return state.category
  },
  getSelectedState: (state) => {
    return state.state
  },
  isAuthenticated(state) {
    return state.token != null
  },
  isRequesting: (rootState) => (storeName, resourceName = null) => {
    if (!resourceName) {
      return rootState[storeName].requesting
    }
    return rootState[storeName].requesting
  },
  getLimit: (rootState) => (storeName, resourceName) => {
    if (resourceName) {
      return rootState[storeName].resource[resourceName].limit
    } else {
      return rootState[storeName].limit
    }
  },
  getResource: (rootState) => (storeName, resourceName = null) => {
    if (resourceName) {
      return rootState[storeName].resource[resourceName].data
    } else {
      return rootState[storeName].resource.data
    }
  },
  getPagination: (rootState) => (storeName, resourceName = null) => {
    if (resourceName) {
      return rootState[storeName].resource[resourceName].pagination.last || 1
    }

    return rootState[storeName].resource.pagination.last || 1
  },
  getVersion: (rootState) => (storeName) => {
    return rootState[storeName].version
  },
  findById: (rootState) => (storeName, id, resourceName = null) => {
    if (resourceName) {
      return _.find(
        rootState[storeName].resource[resourceName].data,
        (item) => {
          return item.id === id
        }
      )
    }

    return _.find(rootState[storeName].resource.data, (item) => {
      return item.id === id
    })
  },
}
