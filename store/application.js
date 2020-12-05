import moment from 'moment-jalaali'
/* eslint-disable */
export const state = () => ({
  loading: true,
  sidebar: [],
  lang: 'fa',
  currency: 'TOMAN' // App Default currency
})

export const getters = {
  activeSidebars: (state) => {
    return state.sidebar
  },
  appDefaultLang: (state) => {
    return state.lang
  },
}

export const mutations = {
  APPLICATION_LOADING (state, status = false) {
    state.loading = status
  },
}

export const actions = {
  // change application currency
  apiResponse ({ app, commit }, response) {
    // This is api success or error message

    // eslint-disable-next-line
    if (_.has(response, 'meta')) {
      const Cookie = require('js-cookie')
      const messages = JSON.parse(localStorage.getItem('messages_' + Cookie.get('lang')))
      if (response.meta.key !== 'UNAUTHORIZED') {
        // eslint-disable-next-line
        let message = _.find(messages, function (mes) {
          return mes.key === response.meta.key
        })

        if (!message || message === undefined) {
          if (response.meta.code === 200) {
            message = this.app.i18n.t('operationSuccess')
          } else {
            message = this.app.i18n.t('unexpectedError')
          }
        } else {
          message = message.message
        }

        // eslint-disable-next-line
        if (_.has(response.meta, 'data')) {
          // eslint-disable-next-line
          _.each(response.meta.data, (item, key) => {
            const regex = new RegExp('({' + key + '})', 'g')
            message = message.replace(regex, item)
          })
        }

        if (response.meta.code === 400) {
          return this.$toast.error(message)
        }

        if (response.meta.code === 200) {
          return this.$toast.success(message)
        }

        return this.$toast.show(message)
      }
    }

    // validation
    // eslint-disable-next-line
    if (_.has(response, 'errors')) {
      const Cookie = process.client ? require('js-cookie') : undefined
      const validationErrs = {}

      // eslint-disable-next-line
      _.each(response.errors, function (field) {
        const dictionary = require('../locale/validation/' + Cookie.get('lang') + '.json')
        let message = dictionary.messages[field.rule].replace('{_field_}', dictionary.names[field.input])

        // rule params values.apiResponse
        // eslint-disable-next-line
        _.each(field.params, function (param) {
          if (field.rule === 'beforeorequal') {
            message = message.replace(/\{.*?\}/s, moment(param).format('jDD/jMM/jYYYY'))
          } else {
            message = message.replace(/\{.*?\}/s, param)
          }
        })

        validationErrs[field.input] = message
      })

      return validationErrs
    }
  }
}
