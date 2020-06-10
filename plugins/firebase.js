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
/* 
const firebaseConfig = {
  apiKey: 'AIzaSyDWMKdGT7-4Jtuhej-VvU0ZLOZ3_VOSQbQ',
  authDomain: 'mwdevportfolio.firebaseapp.com',
  databaseURL: 'https://mwdevportfolio.firebaseio.com',
  projectId: 'mwdevportfolio',
  storageBucket: 'mwdevportfolio.appspot.com',
  messagingSenderId: '154835394637',
  appId: '1:154835394637:web:7f37350b2d6ac7dcea7c04',
  measurementId: 'G-SRXPX1F2FV'
} */
