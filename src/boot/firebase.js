import Firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebase/firestore' // eslint-disable-line
import firebaseConfig from '../../firebase.conf'

export default ({ Vue }) => {
  // Initialize Firebase from settings
  Firebase.initializeApp(firebaseConfig)
  Vue.prototype.$firebase = Firebase
  Vue.prototype.$firebaseui = firebaseui
}
