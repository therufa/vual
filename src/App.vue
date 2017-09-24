<template lang="pug">
  #app
    vual(
      :open="vualOpen"
      size="large"
      @close="vualOpen = false"
      :buttons="vualButtons"
    )
      div yo
    vual(:open="vual2Open"
      @close="vual2Open = false"
      modalBody="Show me what you got"
      disable-overlay-click)
    button(@click="vualOpen = true") Open dialog

</template>

<script>
import Vual from './components/Vual'

export default {
  name: 'app',
  components: {
    Vual
  },
  data () {
    return {
      vualOpen: false,
      vual2Open: false,
      vualButtons: [
        {
          attrs: { },
          label: 'Ok',
          click: (e) => (this.vual2Open = true)
        },
        {
          label: 'Close',
          close: true,
          click: () => (this.vual2Open = true)
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
