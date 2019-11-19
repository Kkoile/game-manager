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
      <q-btn v-if="!currentUser || currentUser.isAnonymous" v-on:click="navToLogin">{{$t('label.login')}}</q-btn>
      <div v-else>
        You're currently logged in as {{currentUser.displayName}}.
        <q-btn v-on:click="logout">{{$t('label.logout')}}</q-btn>
      </div>
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
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      this.currentUser = user
    })
  },
  data: function () {
    return {
      currentUser: null
    }
  },
  methods: {
    async quickStart () {
      const nextLevelIdentifier = await MyStorage.getNextLevelIdentifier()
      if (nextLevelIdentifier) {
        this.$router.push(`/game/${nextLevelIdentifier}`)
      } else {
        this.$q.notify(this.$t('message.noGameLeft'))
      }
    },
    navToLevels () {
      this.$router.push('/levels')
    },
    navToLogin () {
      this.$router.push('/login')
    },
    async logout () {
      try {
        await this.$firebase.auth().signOut()
        this.$q.notify({ message: this.$t('message.logout.success'), icon: 'done', timeout: 1000 })
      } catch (error) {
        console.error(error)
        this.$q.notify({ message: this.$t('message.logout.error'), icon: 'error' })
      }
    }
  }
}
</script>

<style lang='stylus'>
  .header
    position relative
    height 60vh
    color white
  .footer
    background-color $primary
    position relative
    height 40vh
  .quickStart
    transform translateY(-95%)
    background-color white
  .buttonText
    color black
</style>
