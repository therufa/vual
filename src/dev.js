import Vue from 'vue'
import Demo from './Demo'
import Vual from './main'

Vue.use(Vual.install)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Demo)
})
