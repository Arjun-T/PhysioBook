const firebaseConfig = {
  apiKey: "AIzaSyAGi05WczZN0ms2SuVOkjkYNas1Vr9cDEM",
  authDomain: "physio-connect-1286f.firebaseapp.com",
  projectId: "physio-connect-1286f",
  storageBucket: "physio-connect-1286f.firebasestorage.app",
  messagingSenderId: "42846524978",
  appId: "1:42846524978:web:676200350d62602a964e2b",
  measurementId: "G-WFX4L7EFY6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
