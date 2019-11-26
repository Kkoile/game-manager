<template>
  <q-card
    class="flex column game-detail-element">
    <q-card-section>
      <div v-if="game.id" class="text-h6">{{$t('headline.editGame')}}</div>
      <div v-else class="text-h6">{{$t('headline.addGame')}}</div>
    </q-card-section>

    <q-card-section>
      <q-input
        ref="name"
        :placeholder="$t('label.name')"
        v-model="game.name"
        dense
        autofocus
        @keyup.enter="save"
        :rules="[val => val.trim().length > 0 || $t('message.noName')]"
      />
      <div class="text-h6">{{$t('headline.categories')}}</div>
      <q-select
        ref="categories"
        filled
        v-model="game.categories"
        :options="filteredCategories"
        option-value="key"
        option-label="value"
        use-chips
        multiple
        use-input
        @filter="filterCategories"
        stack-label
        :rules="[val => val.length > 0 || $t('message.noCategories')]"
        />
      <div class="text-h6">{{$t('headline.numberOfPlayers')}}</div>
      <div class="row justify-between">
        <div class="row items-center">
          <q-btn flat class="q-pr-lg" :disable="game.numberOfPlayers.min < 2" @click="game.numberOfPlayers.min--">-</q-btn>
          <q-input
            ref="min"
            :label="$t('label.minPlayer')"
            v-model.number="game.numberOfPlayers.min"
            min="1"
            :rules="[val => val >= 1 || $t('message.atLeastOnePlayer')]"
            type="number"
            style="max-width: 2rem"
          />
          <q-btn flat :disable="game.numberOfPlayers.max <= game.numberOfPlayers.min" @click="game.numberOfPlayers.min++">+</q-btn>
        </div>
        <div class="row items-center">
          <q-btn flat class="q-pr-lg" :disable="game.numberOfPlayers.max < 2 || game.numberOfPlayers.max <= game.numberOfPlayers.min" @click="game.numberOfPlayers.max--">-</q-btn>
          <q-input
            ref="max"
            :label="$t('label.maxPlayer')"
            v-model.number="game.numberOfPlayers.max"
            min="1"
            :rules="[
              val => val >= 1 || $t('message.atLeastOnePlayer'),
              val => val >= game.numberOfPlayers.min || $t('message.maxSmallerThanMin')
            ]"
            type="number"
            style="max-width: 2rem"
          />
          <q-btn flat @click="game.numberOfPlayers.max++">+</q-btn>
        </div>
      </div>
      <div class="text-h6">{{$t('headline.averageDuration')}}</div>
      <div class="row items-center">
        <q-icon name="fas fa-clock" class="q-pl-sm q-pr-md"/>
        <q-input
          ref="time"
          :label="$t('label.averageTime')"
          v-model.number="game.averagePlayTime"
          min="1"
          :rules="[val => val >= 1 || $t('message.atLeastOneMinute')]"
          type="number"
        />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat :label="$t('button.cancel')" @click="closeDialog"/>
      <q-btn flat @click="save">{{$t('button.save')}}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import MyStorage from '../lib/storage'
export default {
  name: 'GameDetail',
  props: {
    gameId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      game: {
        name: '',
        categories: [],
        numberOfPlayers: {
          min: 2,
          max: 6
        },
        averagePlayTime: 30
      },
      categories: [],
      filteredCategories: []
    }
  },
  async beforeMount () {
    this.$q.loading.show()
    if (this.gameId) {
      this.game = await MyStorage.loadGame(this.gameId)
    }
    this.categories = await MyStorage.loadCategories()
    this.$q.loading.hide()
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    validateData () {
      const states = ['name', 'categories', 'min', 'max', 'time'].map(ref => {
        return this.$refs[ref].validate()
      })
      return states.every(state => {
        return state
      })
    },
    async save () {
      if (!this.validateData()) {
        return
      }
      this.$q.loading.show()
      const game = await MyStorage.saveGame(this.game)
      this.$q.loading.hide()
      if (this.gameId) {
        this.$emit('updatedGame', game)
      } else {
        this.$emit('newGame', game)
      }
      this.closeDialog()
    },
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
    }
  }
}
</script>

<style lang='stylus'>
  .game-detail-element
    width 100%
    max-width 300px
</style>
