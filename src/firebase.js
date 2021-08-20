import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyBtJuH10TXqWWYJI-Yp1fXfhIC_PQiWBOE",
    authDomain: "covidsafetynetwork.firebaseapp.com",
    projectId: "covidsafetynetwork",
    storageBucket: "covidsafetynetwork.appspot.com",
    messagingSenderId: "395592646823",
    appId: "1:395592646823:web:7047de49b5fbfee9a09b82",
    measurementId: "G-XFZD7MLGSD"
})

export const auth = app.auth()
export default app