
export default {
  loadGame: (identifier) => {
    const game = require(`../assets/levels/${identifier}.json`)
    return game
  }
}
