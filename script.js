// 🔥 Firebase configuration (PASTE YOUR CONFIG HERE)
const firebaseConfig = {
  apiKey: "AIzaSyAGi05WczZN0ms2SuVOkjkYNas1Vr9cDEM",
  authDomain: "physio-connect-1286f.firebaseapp.com",
  projectId: "physio-connect-1286f",
  storageBucket: "physio-connect-1286f.firebasestorage.app",
  messagingSenderId: "42846524978",
  appId: "1:42846524978:web:676200350d62602a964e2b",
  measurementId: "G-WFX4L7EFY6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// ---------- UI FLOW ----------
function showBooking() {
  hideAll();
  document.getElementById("book").style.display = "block";
}

function showRegister() {
  hideAll();
  document.getElementById("register").style.display = "block";
}

function goHome() {
  hideAll();
  document.getElementById("choice").style.display = "block";
}

function hideAll() {
  document.getElementById("choice").style.display = "none";
  document.getElementById("book").style.display = "none";
  document.getElementById("register").style.display = "none";
}

// ---------- FORM HANDLERS ----------

// Booking form
document.querySelector("#book form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const data = {
    name: form[0].value,
    location: form[1].value,
    date: form[2].value,
    time: form[3].value,
    condition: form[4].value,
    createdAt: new Date()
  };

  try {
    await db.collection("bookings").add(data);
    alert("Booking submitted successfully!");
    form.reset();
    goHome();
  } catch (err) {
    alert("Error saving booking");
    console.error(err);
  }
});

// Physio registration form
document.querySelector("#register form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const data = {
    name: form[0].value,
    email: form[1].value,
    qualification: form[2].value,
    specialization: form[3].value,
    price: form[4].value,
    radius: form[5].value,
    createdAt: new Date()
  };

  try {
    await db.collection("physios").add(data);
    alert("Physio registered successfully!");
    form.reset();
    goHome();
  } catch (err) {
    alert("Error saving registration");
    console.error(err);
  }
});
