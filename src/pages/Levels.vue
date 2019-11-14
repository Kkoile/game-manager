<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn @click="$router.go(-1)" flat icon="arrow_back"/>
      </q-toolbar>
    </q-header>

    <q-page-container class="flex column justify-center">
      <div class="flex row justify-center container">
        <q-card
          :class="{won: level.won, started: level.moves && level.moves.length > 0}"
          :key="level.identifier"
          class="flex column justify-center level"
          v-for="(level, i) in levels"
          v-on:click="openLevel(level.identifier)">
          <div class="flex flex-center levelBody">
            <q-icon color="primary" name="done" size="2.2rem" v-if="!!level.won"/>
            <q-icon color="primary" name="access_time" size="1.5rem" v-if="level.moves && level.moves.length > 0 && !level.won"/>
            {{$t('label.level')}} {{i + 1}}
          </div>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import MyStorage from '../lib/storage'

export default {
  name: 'Levels',
  data () {
    return {
      levels: []
    }
  },
  mounted () {
    this.loadLevels()
  },
  methods: {
    loadLevels () {
      this.levels = []
      const levels = require(`../assets/levels/levels.json`)
      levels.forEach((identifier) => {
        this.levels.push(MyStorage.loadGame(identifier))
      })
    },
    openLevel (identifier) {
      this.$router.push(`/game/${identifier}`)
    }
  }
}
</script>

<style lang='stylus'>
  @import '~quasar-variables'

  .container
    padding-top 10px
    padding-bottom 30px

  .level
    width 10rem
    height 10rem
    flex-shrink 0
    margin 0.5rem
    flex-direction column

  .levelBody
    padding 1.5rem
    text-align center
    font-size 1.3rem
    flex-direction: column
    display: flex
</style>
