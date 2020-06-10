import firebase from 'firebase/app'
import 'firebase/firestore'
import '@nuxtjs/dotenv'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.DOMAIN,
    databaseURL: process.env.DATABASE,
    projectId: process.env.PID,
    storageBucket: process.env.BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.AID,
    measurementId: process.env.MID
  }
  firebase.initializeApp(firebaseConfig)
}
const fireDb = firebase.firestore()
export { fireDb }
