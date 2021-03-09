import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAs9yjOj0jbBDRHbscaLOKL3kQ1YaaOA_k",
  authDomain: "sports-betting-2021.firebaseapp.com",
  projectId: "sports-betting-2021",
  storageBucket: "sports-betting-2021.appspot.com",
  messagingSenderId: "637044881054",
  appId: "1:637044881054:web:deb10083ddf11618cfed8f",
  measurementId: "G-1PJCSDWWHR"
};

firebase.initializeApp(firebaseConfig);

export default firebase;