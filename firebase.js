// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuiIR2JTAsgidXSdYUW720Q-WjMHM_oSk',
  authDomain: 'compra-a8a72.firebaseapp.com',
  projectId: 'compra-a8a72',
  storageBucket: 'compra-a8a72.appspot.com',
  messagingSenderId: '383387340295',
  appId: '1:383387340295:web:bf30fe04e8e371154ae4a2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
