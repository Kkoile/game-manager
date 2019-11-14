<template>
  <div class='flex flex-center column'>
    <StarBackground />
    <div class="flex flex-center full-width header">
      <h2>Trilogic</h2>
    </div>
    <div class="flex flex-center column full-width footer">
      <q-btn
        class="quickStart"
        icon="play_arrow"
        round
        size="2rem"
        v-on:click="quickStart" />
      <q-btn color="white" size="1.2rem" text-color="black" v-on:click="navToLevels" >{{$t('label.levels')}}</q-btn>
    </div>
  </div>
</template>

<script>
import MyStorage from '../lib/storage'
import StarBackground from '../components/StarBackground'
export default {
  name: 'Index',
  components: {
    StarBackground
  },
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
    position relative
    height 60vh
    color white
  .footer
    background-color $primary
    position relative
    height 40vh
  .quickStart
    transform translateY(-110%)
    background-color white
  .buttonText
    color black
</style>
