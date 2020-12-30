/* eslint-disable */
import CookieParser from "cookieparser";

export const state = () => ({
  limit: 21,
  category: null,
  state: null,
  subCategories: [],
  city: null,
  order: null,
  token: null,
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  ADD_DATA(rootState, { storeName, resourceName, data, isData = false }) {
    if (resourceName && isData === false) {
      rootState[storeName].resource[resourceName].data.push(...data)
      rootState[storeName].requesting = false
    } else if (isData === false) {
      rootState[storeName].resource.data.push(...data)
      rootState[storeName].requesting = false
    } else {
      rootState[storeName].resource.data.data.push(...data)
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
  SELECT_SUBCATEGORY(state, payload) {
    state.subCategories = payload.subCategory
  },
  SELECT_CITY(state, payload) {
    state.city = payload.city
  },
  SELECT_ORDER(state, payload) {
    state.order = payload.order
  },
  SELECT_STATE(state, payload) {
    state.state = payload.state
  },
  EMPTY_SEARCH_DATA(state) {
    state.category = null
    state.subCategory = null
    state.city = null
    state.order = null
    state.state = null
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
    if (
      req.headers.cookie &&
      req.headers.cookie.type === 'String'
    ) {
      const cookies = CookieParser.parse(req.headers.cookie)
      const token = cookies.token
      commit('SET_TOKEN', token)
    }
  },
  fill({ commit }, { storeName, resourceName, data, pagination }) {
    commit('FILL', { storeName, resourceName, data, pagination })
  },
  add({ commit }, { storeName, resourceName, data, isData }) {
    commit('ADD_DATA', { storeName, resourceName, data, isData })
  },
  empty({ commit }, { storeName, resourceName }) {
    commit('EMPTY_DATA', { storeName, resourceName })
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
    { commit, state },
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
  delete({ state, commit }, { url, config }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(url, config)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
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
  getSelectedSubCategories: (state) => {
    return state.subCategories
  },
  getSelectedState: (state) => {
    return state.state
  },
  getSelectedCity: (state) => {
    return state.city
  },
  getSelectedOrder: (state) => {
    return state.order
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
