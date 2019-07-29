import { LocalStorage } from 'quasar'

export default {
  saveGame: (identifier, won, board, missingElements, moves) => {
    const payload = {}
    payload.won = won
    if (!won) {
      payload.moves = moves
    }
    payload.board = board
    payload.missingElements = missingElements
    LocalStorage.set(identifier, payload)
  },
  loadGame: (identifier, hardReload) => {
    const game = JSON.parse(JSON.stringify(require(`../assets/levels/${identifier}.json`)))
    game.identifier = identifier
    game.moves = []
    game.won = false
    const savedGame = LocalStorage.getItem(identifier)
    if (savedGame && !hardReload) {
      game.won = savedGame.won
      game.moves = savedGame.moves
      game.board = savedGame.board
      game.missingElements = savedGame.missingElements
    }
    return game
  },
  getNextLevelIdentifier: () => {
    let nextLevel = null
    const levels = require(`../assets/levels/levels.json`)
    nextLevel = levels.find((level) => {
      const savedGame = LocalStorage.getItem(level)
      return !savedGame || !savedGame.won
    })
    return nextLevel
  }
}
