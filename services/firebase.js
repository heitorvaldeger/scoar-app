import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDi7FTJplxdcfOjRdkq4in0MsA-MSRLULc',
  authDomain: 'scoar-app.firebaseapp.com',
  databaseURL: 'https://scoar-app.firebaseio.com', // DEFAULT
  projectId: 'scoar-app',
  storageBucket: 'scoar-app.appspot.com',
  messagingSenderId: '863908883910',
  appId: '1:863908883910:web:809f00cd5b6a123c6c16c7',
  measurementId: 'G-RG65LNDC1C'
}

if (window.location.hostname === 'localhost') {
  firebaseConfig.databaseURL = 'http://localhost:9000?ns=scoar-app'
}

export const db = firebase.initializeApp(firebaseConfig).database()
