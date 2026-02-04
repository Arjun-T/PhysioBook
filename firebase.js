const firebaseConfig = {
  apiKey: "AIzaSyAGi05WczZN0ms2SuVOkjkYNas1Vr9cDEM",
  authDomain: "physio-connect-1286f.firebaseapp.com",
  projectId: "physio-connect-1286f",
  storageBucket: "physio-connect-1286f.firebasestorage.app",
  messagingSenderId: "42846524978",
  appId: "1:42846524978:web:2659eb2197c3d156964e2b",
  measurementId: "G-YDBH4QXJ0F"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
