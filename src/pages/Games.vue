<template>
  <q-page padding class="flex column">
    <div class="searchBar flex row justify-center q-pa-md">
      <q-input v-model="searchTerm"
               style="width: calc(100% - 2.1rem)"
               dense
               :placeholder="$t('label.searchPlaceholder')"
               @keyup.enter="search"/>
      <q-btn icon="fas fa-search" dense flat @click="search"/>
    </div>
    <div v-if="sortedGames.length" class="self-center">[{{this.sortedGames.length}} / {{this.games.length}}]</div>
    <div class="q-pa-md row justify-center q-gutter-md">
      <div v-if="!games.length" class="flex column items-center">
        <div class="text-h6 text-grey">{{$t('message.noGamesYet')}}</div>
        <q-icon size="10rem" color="grey" name="fas fa-chess-queen" />
        <q-btn class="q-mt-lg" color="primary" @click="newGame">{{$t('button.addFirstGame')}}</q-btn>
      </div>
      <div v-if="games.length && !sortedGames.length" class="flex column items-center">
        <div class="text-h6 text-grey">{{$t('message.nothingFound')}}</div>
        <q-icon size="10rem" color="grey" name="fas fa-frown-open" />
      </div>
      <q-card
        v-for="game in sortedGames"
        :key="game.id"
        class="flex column game-element bg-white"
      >
        <q-card-section
          @click="editGame(game.id)">
          <div class="text-h6">{{game.name}}</div>
        </q-card-section>
        <q-card-section
          @click="editGame(game.id)">
          <div class="flex row items-center q-pl-sm">
            <q-icon
              name="fas fa-users"
            />
            <span class="q-pl-sm">{{game.numberOfPlayers.min}}</span>
            <span v-if="game.numberOfPlayers.max !== game.numberOfPlayers.min" class="q-pl-sm q-pr-sm">-</span>
            <span v-if="game.numberOfPlayers.max !== game.numberOfPlayers.min">{{game.numberOfPlayers.max}}</span>
            <div class="flex row items-center q-pl-lg">
              <q-icon class="q-pr-md" name="fas fa-clock"/>
              {{game.averagePlayTime}}
            </div>
          </div>
        </q-card-section>
        <q-card-section
          @click="editGame(game.id)">
          <q-chip
            v-for="category in game.categories"
            :key="category.key"
            dense
          >
            {{category.value}}
          </q-chip>
        </q-card-section>

        <q-separator class="bg-white"
                     @click="editGame(game.id)"/>

        <q-card-actions align="right">
          <q-btn flat color="negative" @click="askToDeleteGame(game)">{{$t('button.delete')}}</q-btn>
          <q-btn flat color="primary" @click="editGame(game.id)">{{$t('button.edit')}}</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="fas fa-plus" color="primary" @click="newGame" />
    </q-page-sticky>

    <q-dialog v-model="showAddGameDialog" persistent>
      <GameDetail :gameId="pressedGameId" @close="closePopup" @updatedGame="updateGame" @newGame="addGame"/>
    </q-dialog>

    <q-dialog v-model="deleteGameConfirmation" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-exclamation-triangle" color="negative" text-color="white" />
          <span v-if="gameToDelete" class="q-ml-sm">{{$t('message.confirmDeletion', {name: gameToDelete.name})}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="primary" @click="deleteGame" v-close-popup  />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import GameDetail from './GameDetail'
import MyStorage from '../lib/storage'
import Fuse from 'fuse.js'
export default {
  name: 'Games',
  components: {
    GameDetail
  },
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/login')
      } else {
        this.loadGames()
      }
    })
  },
  data () {
    return {
      fuse: null,
      searchTerm: '',
      games: [],
      filteredGames: [],
      showAddGameDialog: false,
      deleteGameConfirmation: false,
      gameToDelete: null,
      pressedGameId: null
    }
  },
  computed: {
    sortedGames () {
      return [...this.filteredGames].sort((gameA, gameB) => {
        const textA = gameA.name.toUpperCase()
        const textB = gameB.name.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })
    }
  },
  watch: {
    games (val) {
      this.fuse = new Fuse(val, { shouldSort: false, threshold: 0.35, keys: [{ name: 'name', weight: 0.7 }, { name: 'categories.value', weight: 0.3 }] })
    }
  },
  methods: {
    async loadGames () {
      this.$q.loading.show()
      try {
        this.games = await MyStorage.loadGames()
        this.filteredGames = this.games
      } catch (error) {
        if (error.message === 'NOT_LOGGED_IN') {
          this.$router.push('login')
        }
      }
      this.$q.loading.hide()
    },
    newGame () {
      this.showAddGameDialog = true
    },
    editGame (id) {
      this.pressedGameId = id
      this.showAddGameDialog = true
    },
    closePopup () {
      this.pressedGameId = null
      this.showAddGameDialog = false
    },
    addGame (game) {
      this.games.push(game)
    },
    updateGame (updatedGame) {
      const index = this.games.findIndex(game => {
        return game.id === updatedGame.id
      })
      this.$set(this.games, index, updatedGame)
    },
    askToDeleteGame (game) {
      this.deleteGameConfirmation = true
      this.gameToDelete = game
    },
    async deleteGame () {
      this.$q.loading.show()
      await MyStorage.deleteGame(this.gameToDelete.id)
      const index = this.games.findIndex(game => {
        return game.id === this.gameToDelete.id
      })
      this.games.splice(index, 1)
      this.gameToDelete = null
      this.$q.loading.hide()
    },
    search () {
      if (this.searchTerm.trim().length > 0) {
        this.$q.loading.show()
        this.filteredGames = this.fuse.search(this.searchTerm)
        this.$q.loading.hide()
      } else {
        this.filteredGames = this.games
      }
    }
  }
}
</script>

<style lang='stylus'>
  .searchBar
    width 100%
  .game-element
    width 100%
    max-width 300px
</style>
