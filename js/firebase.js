import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

  apiKey:
  "AIzaSyAcoA5ikgb9BbwsDCCBSutFAy9vymtyzSo",

  authDomain:
  "music-review-9d7f2.firebaseapp.com",

  projectId:
  "music-review-9d7f2",

  storageBucket:
  "music-review-9d7f2.firebasestorage.app",

  messagingSenderId:
  "266628689675",

  appId:
  "1:266628689675:web:183974f1eaa3fd71dabc0e",

  measurementId:
  "G-HP8Y9BJ1VE"
};

const app =
initializeApp(
    firebaseConfig
);

const db =
getFirestore(app);

const auth =
getAuth(app);

export {
    db,
    auth
};