<template>
  <q-page padding class="flex column">
    <div class="text-h2 text-center q-pb-md">{{$t('headline.login')}}</div>
    <div id="firebaseui-auth-container"/>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  mounted () {
    this.$q.loading.show()
    const config = {
      callbacks: {
        uiShown: () => {
          this.$q.loading.hide()
        }
      },
      signInSuccessUrl: '/',
      signInOptions: [
        this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        this.$firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    let ui = this.$firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new this.$firebaseui.auth.AuthUI(this.$firebase.auth())
    }
    ui.start('#firebaseui-auth-container', config)
  }
}
</script>
