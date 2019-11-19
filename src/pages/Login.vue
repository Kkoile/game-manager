<template>
  <div class='flex flex-center column'>
    <StarBackground class="background" />
    <h1 class="headline">Login</h1>
    <div id="firebaseui-auth-container"/>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import StarBackground from '../components/StarBackground'
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
        signInFailure: (error) => {
          console.error(error)
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
  }
}
</script>
<styles lang="stylus">
  .headline
    color white
  .background
    z-index -1
</styles>
