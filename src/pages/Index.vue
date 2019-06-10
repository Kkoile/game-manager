<template>
  <div class='flex flex-center column'>
    <div class="flex flex-center full-width header">
      <h2>Trilogic</h2>
    </div>
    <q-btn
      class="quickStart"
      icon="play_arrow"
      round
      size="2rem"
      v-on:click="quickStart" />
    <q-btn color="primary" v-on:click="navToLevels" >{{$t('label.levels')}}</q-btn>
  </div>
</template>

<script>
import MyStorage from '../lib/storage'
export default {
  name: 'Index',
  methods: {
    quickStart () {
      const nextLevelIdentifier = MyStorage.getNextLevelIdentifier()
      if (nextLevelIdentifier) {
        this.$router.push(`/game/${nextLevelIdentifier}`)
      } else {
        this.$q.notify(this.$t('message.noGameLeft'))
      }
    },
    navToLevels () {
      this.$router.push('/levels')
    }
  }
}
</script>

<style lang='stylus'>
  @import '~quasar-variables'

  .header
    height 60vh
    background-color $primary
    color white
  .quickStart
    top -3rem
    background-color white
</style>
