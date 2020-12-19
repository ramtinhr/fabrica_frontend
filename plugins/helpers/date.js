/* eslint-disable */
import moment from '../../node_modules/moment/moment'
import fa from '../../node_modules/moment/locale/fa.js'
import Vue from 'vue'
// ۳ روز پیش
Vue.prototype.$dateFromNow = (date) => {
  moment.locale('fa', fa)
  return moment(date).fromNow()
}

// ۱۳۹۹/۱/۴ ۱۳:۵۸
Vue.prototype.$jalaliDateTime = (date) => {
  const moment = require('moment-jalaali')
  return moment(date).format('jYYYY/jM/jD hh:mm')
}

// ۱۳۹۹-۱-۴
Vue.prototype.$jalaliDate = (date) => {
  const moment = require('moment-jalaali')
  return moment(date, 'YYYY-M-D').format('jYYYY-jM-jD')
}

// ۱۳۹۹-۱-۴
Vue.prototype.$gregorianDate = (date) => {
  const moment = require('moment-jalaali')
  return moment(date, 'jYYYY-jM-jD').format('YYYY-MM-DD')
}
