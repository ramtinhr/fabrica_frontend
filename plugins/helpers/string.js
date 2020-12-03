import Vue from 'vue'

Vue.prototype.$strLimit = (value, stop, fromEnd = false) => {
  if (typeof value === 'undefined') {
    return value
  }

  if (fromEnd) {
    return value.slice(-stop) + (stop < value.length ? '...' : '')
  }

  return value.slice(0, stop) + (stop < value.length ? '...' : '')
}
