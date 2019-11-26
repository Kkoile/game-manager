<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="currentUser" dense flat round icon="fas fa-bars" @click="left = !left" />

        <q-toolbar-title>
          Game Manager
        </q-toolbar-title>

        <q-avatar>
          <q-btn icon="fas fa-chess-bishop" flat @click="$router.push('/')" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer elevated v-model="left">
      <q-item clickable v-ripple to="/" :exact="true">
        <q-item-section avatar>
          <q-icon name="fas fa-home" />
        </q-item-section>
        <q-item-section>
          {{$t('button.home')}}
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="games" :exact="true">
        <q-item-section avatar>
          <q-icon name="fas fa-dice" />
        </q-item-section>
        <q-item-section>
          {{$t('button.games')}}
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item clickable v-ripple @click="askForLogout">
        <q-item-section avatar>
          <q-icon name="fas fa-power-off" color="negative"/>
        </q-item-section>
        <q-item-section>
          {{$t('button.logout')}}
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <q-dialog v-model="logoutConfirmation" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-exclamation-triangle" color="negative" text-color="white" />
          <span class="q-ml-sm">{{$t('message.confirmLogout')}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('button.cancel')" v-close-popup />
          <q-btn flat :label="$t('button.logout')" color="primary" @click="logout" v-close-popup  />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script>
export default {
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      this.currentUser = user
      if (!this.currentUser) {
        this.$router.push('/login')
      }
    })
  },
  data () {
    return {
      left: false,
      currentUser: null,
      logoutConfirmation: false
    }
  },
  methods: {
    askForLogout () {
      this.logoutConfirmation = true
    },
    async logout () {
      this.$q.loading.show()
      try {
        await this.$firebase.auth().signOut()
        this.$q.notify({ message: this.$t('message.logout.success'), icon: 'fas fa-check', timeout: 1000 })
      } catch (error) {
        this.$q.notify({ message: this.$t('message.logout.error'), icon: 'error' })
      }
      this.$q.loading.hide()
    }
  }
}
</script>
