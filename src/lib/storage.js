
export default {
  loadGame: (identifier, hardReload) => {
    const game = require(`../assets/levels/${identifier}.json`)
    return JSON.parse(JSON.stringify(game))
  }
}
