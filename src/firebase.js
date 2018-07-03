// Initialize Firebase

import { initializeApp } from 'firebase'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDUCdJso171eQeVqQFigluxcNz-dx308aE",
  authDomain: "test-firebase-79ea1.firebaseapp.com",
  databaseURL: "https://test-firebase-79ea1.firebaseio.com",
  projectId: "test-firebase-79ea1",
  storageBucket: "test-firebase-79ea1.appspot.com",
  messagingSenderId: "857332130366"
})

export const db = firebaseApp.database()