// Initialize Firebase

import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDUCdJso171eQeVqQFigluxcNz-dx308aE",
  authDomain: "test-firebase-79ea1.firebaseapp.com",
  databaseURL: "https://test-firebase-79ea1.firebaseio.com",
  projectId: "test-firebase-79ea1",
  storageBucket: "test-firebase-79ea1.appspot.com",
  messagingSenderId: "857332130366"
}

firebase.initializeApp(config);

const db = firebase.database()
const todo = db.ref('todos/')
const progress = db.ref('progress/')
const done = db.ref('done/')

export { todo, progress, done }