import Vue from 'vue'
import App from './App.vue'

//Imports
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPlus,
  faMinus,
  faTrash,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

library.add(faPlus,
  faMinus,
  faTrash,
  faCheck)



  Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
