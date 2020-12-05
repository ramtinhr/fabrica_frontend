import Vue from 'vue'
import {
  localize,
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate/dist/vee-validate.full'

localize({
  fa: {
    messages: require('../locale/validation/fa.json').messages,
    names: require('../locale/validation/fa.json').names,
  },
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
