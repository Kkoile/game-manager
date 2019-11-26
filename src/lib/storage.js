import Firebase from 'firebase'
import { i18n } from '../boot/i18n'

let categories = []
let categoriesTranslation = {}

const getCurrentUser = async () => {
  if (!Firebase.auth().currentUser) {
    throw new Error('NOT_LOGGED_IN')
  }
  return Firebase.auth().currentUser
}

const loadCategories = async () => {
  if (!categories.length) {
    const docs = (await Firebase.firestore().collection('categories').get()).docs
    categories = docs.map(doc => {
      const data = doc.data()
      return {
        key: doc.data().key,
        value: data[i18n.locale] || data[i18n.fallbackLocale]
      }
    }).sort((categoryA, categoryB) => {
      const textA = categoryA.value.toUpperCase()
      const textB = categoryB.value.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
    categories.forEach(category => {
      categoriesTranslation[category.key] = category.value
    })
  }
  return categories
}

const loadGame = async (id) => {
  const currentUser = await getCurrentUser()
  const doc = (await Firebase.firestore().collection('users').doc(currentUser.uid).collection('games').doc(id).get())
  const game = {
    ...doc.data(),
    id: doc.id
  }
  await applyTranslationToGame(game)
  return game
}

const loadGames = async () => {
  const currentUser = await getCurrentUser()
  const docs = (await Firebase.firestore().collection('users').doc(currentUser.uid).collection('games').get()).docs
  return Promise.all(docs.map(async doc => {
    const game = {
      ...doc.data(),
      id: doc.id
    }
    await applyTranslationToGame(game)
    return game
  }))
}

const applyTranslationToGame = async (game) => {
  await loadCategories()
  game.categories = game.categories.map(category => {
    return {
      key: category,
      value: categoriesTranslation[category]
    }
  })
}

const saveGame = async (game) => {
  const currentUser = await getCurrentUser()
  const gamesCollection = Firebase.firestore().collection('users').doc(currentUser.uid).collection('games')
  let id = game.id
  game.categories = game.categories.map(category => category.key)
  if (id) {
    await gamesCollection.doc(game.id).set(game)
  } else {
    id = (await gamesCollection.add(game)).id
  }
  game.id = id
  await applyTranslationToGame(game)
  return game
}

const deleteGame = async (id) => {
  const currentUser = await getCurrentUser()
  await Firebase.firestore().collection('users').doc(currentUser.uid).collection('games').doc(id).delete()
}

export default {
  loadCategories,
  loadGames,
  loadGame,
  saveGame,
  deleteGame
}
