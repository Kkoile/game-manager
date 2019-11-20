import Firebase from 'firebase'

const getCurrentUser = async () => {
  if (!Firebase.auth().currentUser) {
    await Firebase.auth().signInAnonymously()
  }
  return Firebase.auth().currentUser
}

const deleteUserCollection = async (existingLevels) => {
  const currentUser = await getCurrentUser()
  for (const level of existingLevels) {
    await Firebase.firestore().collection('users').doc(currentUser.uid).collection('levels').doc(level.identifier).delete()
  }
  await Firebase.firestore().collection('users').doc(currentUser.uid).delete()
}

const getDatabaseLevelsReference = async () => {
  const currentUser = await getCurrentUser()
  return Firebase.firestore().collection('users').doc(currentUser.uid).collection('levels')
}

const getLevelFromAssets = (identifier) => {
  const level = JSON.parse(JSON.stringify(require(`../assets/levels/${identifier}.json`)))
  level.identifier = identifier
  level.moves = []
  level.won = false
  return level
}

const saveGame = async (identifier, won, board, missingElements, moves) => {
  const payload = {}
  payload.won = won
  if (!won && moves.length > 0) {
    payload.moves = JSON.stringify(moves)
    payload.started = true
  }
  payload.board = JSON.stringify(board)
  missingElements.forEach(element => {
    element.selected = false
  })
  payload.missingElements = JSON.stringify(missingElements)
  await (await getDatabaseLevelsReference()).doc(identifier).set(payload)
}

const loadGame = async (identifier, hardReload) => {
  const game = getLevelFromAssets(identifier)
  if (!hardReload) {
    const savedGame = await (await getDatabaseLevelsReference()).doc(identifier).get()
    if (savedGame.exists) {
      game.won = savedGame.data().won
      if (savedGame.data().moves) {
        game.moves = JSON.parse(savedGame.data().moves)
      }
      game.board = JSON.parse(savedGame.data().board)
      game.missingElements = JSON.parse(savedGame.data().missingElements)
    }
  }
  return game
}

const getNextLevelIdentifier = async () => {
  const levels = await getLevels()
  let nextLevel = null
  for (const level of levels) {
    if (!level.won) {
      nextLevel = level
      break
    }
  }
  return nextLevel.identifier
}

const getLevels = async () => {
  const levelIdentifier = require(`../assets/levels/levels.json`)
  const levelsWon = (await (await getDatabaseLevelsReference()).where('won', '==', true).get()).docs
  const levelsStarted = (await (await getDatabaseLevelsReference()).where('started', '==', true).get()).docs
  return levelIdentifier.map(identifier => {
    const level = getLevelFromAssets(identifier)
    const wonGame = levelsWon.find(game => {
      return game.id === identifier
    })
    if (wonGame) {
      level.won = true
    }
    const startedGame = levelsStarted.find(game => {
      return game.id === identifier
    })
    if (startedGame) {
      level.started = true
    }
    return level
  })
}

const getAllGames = async () => {
  const games = (await (await getDatabaseLevelsReference()).get()).docs
  return games.map(game => {
    const data = game.data()
    return {
      identifier: game.id,
      won: data.won,
      moves: data.moves ? JSON.parse(data.moves) : [],
      board: JSON.parse(data.board),
      missingElements: JSON.parse(data.missingElements)
    }
  })
}

export default {
  saveGame,
  loadGame,
  getNextLevelIdentifier,
  getLevels,
  getAllGames,
  deleteUserCollection
}
