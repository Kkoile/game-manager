<template>
  <div class='flex flex-center column'>
    <StarBackground class="background" />
    <q-btn @click="cancel" class="closeButton" flat icon="close" />
    <h1 class="headline">Login</h1>
    <div id="firebaseui-auth-container"/>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import StarBackground from '../components/StarBackground'
import MyStorage from '../lib/storage'
export default {
  name: 'Login',
  components: {
    StarBackground
  },
  mounted () {
    this.loading = true
    const config = {
      callbacks: {
        uiShown: () => {
          this.loading = false
        },
        signInFailure: async (error) => {
          if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
            return Promise.resolve()
          }
          const anonymousGames = await MyStorage.getAllGames()
          await MyStorage.deleteUserCollection(anonymousGames)
          const user = this.$firebase.auth().currentUser
          await user.delete()

          var cred = error.credential
          await this.$firebase.auth().signInWithCredential(cred)
          try {
            for (const game of anonymousGames) {
              await MyStorage.saveGame(game.identifier, game.won, game.board, game.missingElements, game.moves)
            }
          } catch (error) {
            console.error(error)
          }
          this.$router.replace('/')
        }
      },
      signInSuccessUrl: '/',
      signInOptions: [
        this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        this.$firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      autoUpgradeAnonymousUsers: true
    }
    let ui = this.$firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new this.$firebaseui.auth.AuthUI(this.$firebase.auth())
    }
    ui.start('#firebaseui-auth-container', config)
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    cancel () {
      this.$router.replace('/')
    }
  }
}
</script>
<styles lang="stylus">
  .headline
    color white
  .background
    z-index -1
  .closeButton
    position absolute
    font-size: 22px
    left 12px
    top 4px
    color: #F5F5F5
    padding 0
    z-index 10
</styles>
