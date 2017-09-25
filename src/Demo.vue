<template lang="pug">
#app()
  button(@click="buttonClickListener") Open Vual
  vual(:open="vualOpen" @close="vualCloseListener") Hello world
</template>

<script charset="utf-8">
export default {
  name: 'vual-demo',
  data () {
    return {
      vualOpen: true
    }
  },
  methods: {
    vualCloseListener () {
      this.vualOpen = false
    },
    buttonClickListener () {
      this.vualOpen = true
    }
  }
}
</script>
