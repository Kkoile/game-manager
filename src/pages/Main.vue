<template>
  <q-page padding class="flex column">
    <q-banner v-if="!games.length" class="bg-grey-1">
      {{$t('message.noGames')}}
      <template v-slot:avatar>
        <q-icon name="fas fa-exclamation-triangle" color="warning" />
      </template>
      <template v-slot:action>
        <q-btn flat :label="$t('button.addGame')" @click="$router.push('/games')"/>
      </template>
    </q-banner>
    <div id="actions" class="q-pa-md column items-center q-gutter-md">
      <q-card
        class="flex column"
      >
        <q-card-section>
          <div class="text-h6">{{$t('headline.proposeGame')}}</div>
        </q-card-section>

        <q-card-section>
          <div class="flex row items-center q-pl-md">
            <q-icon class="q-pr-md" name="fas fa-users" />
            <q-btn flat :disable="numberOfPlayers < 2" @click="numberOfPlayers--" class="q-mr-sm">-</q-btn>
            <q-input
              :label="$t('label.numberOfPlayers')"
              v-model.number="numberOfPlayers"
              min="1"
              :rules="[val => val >= 1 || $t('message.atLeastOnePlayer')]"
              type="number"
              style="max-width: 6rem"
            />
            <q-btn flat @click="numberOfPlayers++">+</q-btn>
          </div>
        </q-card-section>

        <q-card-section>
          <q-select
            :label="$t('label.categories')"
            filled
            v-model="selectedCategories"
            :options="filteredCategories"
            option-value="key"
            option-label="value"
            use-chips
            multiple
            use-input
            @filter="filterCategories"
            stack-label
            :placeholder="selectedCategories.length === 0 ? $t('label.anyCategory') : ''"
          />
        </q-card-section>

        <q-card-section>
          <div class="text-weight-thin q-pl-sm"><q-icon name="fas fa-clock" class="q-pr-md"/>{{$t('headline.duration')}}</div>
          <q-radio v-model="duration" val="ANY" dense class="q-pr-sm" :label="$t('label.anyDuration')" />
          <q-radio v-model="duration" val="SHORT" dense class="q-pr-sm" :label="$t('label.shortDuration')" />
          <q-radio v-model="duration" val="MEDIUM" dense class="q-pr-sm" :label="$t('label.mediumDuration')" />
          <q-radio v-model="duration" val="LONG" dense class="q-pr-sm" :label="$t('label.longDuration')" />
        </q-card-section>

        <q-separator />

        <q-card-section v-if="proposedGame">
          <div class="text-h6">{{$t('headline.proposedGame')}}</div>
          <div class="text-h4">{{proposedGame.name}}</div>
        </q-card-section>

        <q-card-section v-if="proposeGamePressed && !proposedGame">
          <div class="text-h6">{{$t('message.noProposedGame')}}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat @click="proposeGame">{{$t('button.proposeGame')}}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import MyStorage from '../lib/storage'
export default {
  name: 'Games',
  async beforeMount () {
    this.$q.loading.show()
    this.categories = await MyStorage.loadCategories()
    this.games = await MyStorage.loadGames()
    this.$q.loading.hide()
  },
  data () {
    return {
      games: [],
      numberOfPlayers: 2,
      categories: [],
      selectedCategories: [],
      filteredCategories: [],
      proposedGame: null,
      proposeGamePressed: false,
      duration: 'ANY'
    }
  },
  computed: {
    selectedCategoryKeys () {
      return this.selectedCategories.map(category => {
        return category.key
      })
    }
  },
  methods: {
    filterCategories (val, update) {
      if (val === '') {
        update(() => {
          this.filteredCategories = this.categories
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredCategories = this.categories.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
      })
    },
    async proposeGame () {
      this.$q.loading.show()
      this.proposeGamePressed = true
      if (!this.games.length) {
        this.games = await MyStorage.loadGames()
      }
      const filteredGames = this.games.filter(game => {
        if (game.numberOfPlayers.min > this.numberOfPlayers || game.numberOfPlayers.max < this.numberOfPlayers) {
          return false
        }
        if (this.selectedCategories.length) {
          const categoryFulfilled = game.categories.some(category => {
            return this.selectedCategoryKeys.includes(category.key)
          })
          if (!categoryFulfilled) {
            return false
          }
        }
        if (this.duration === 'SHORT' && game.averagePlayTime > 30) {
          return false
        }
        if (this.duration === 'MEDIUM' && (game.averagePlayTime <= 30 || game.averagePlayTime > 60)) {
          return false
        }
        if (this.duration === 'LONG' && game.averagePlayTime <= 60) {
          return false
        }
        return true
      })
      this.proposedGame = filteredGames[Math.floor(Math.random() * filteredGames.length)]
      this.$q.loading.hide()
    }
  }
}
</script>

<style lang='stylus'>
  .game-element
    width 100%
    max-width 250px
</style>
