import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBookmark)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
