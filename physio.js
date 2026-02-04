let physioId;
let selectedSlots = [];

auth.onAuthStateChanged(user => {
  if (!user) return location.href = "index.html";
  physioId = user.uid;
  loadRequests();
});

function logout() {
  auth.signOut().then(() => location.href = "index.html");
}

function showTab(id) {
  document.querySelectorAll(".tab-content").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function toggleSlot(btn) {
  const t = btn.innerText;
  btn.classList.toggle("active");
  selectedSlots.includes(t)
    ? selectedSlots = selectedSlots.filter(x => x !== t)
    : selectedSlots.push(t);
}

async function saveAvailability() {
  const date = document.getElementById("availDate").value;
  if (!date || selectedSlots.length === 0) return alert("Select date & slots");

  await db.collection("availability").doc(physioId).set({
    [date]: selectedSlots
  }, { merge: true });

  alert("Saved!");
  selectedSlots = [];
}

async function loadRequests() {
  const list = document.getElementById("requestList");
  list.innerHTML = "";

  const snap = await db.collection("bookings")
    .where("physioId", "==", physioId)
    .get();

  snap.forEach(doc => {
    const c = document.createElement("div");
    c.className = "card large";
    c.innerHTML = `
      <p>Booking Request</p>
      <button class="primary-btn" onclick="update('${doc.id}','accepted')">Accept</button>
    `;
    list.appendChild(c);
  });
}

async function update(id, status) {
  await db.collection("bookings").doc(id).update({ status });
  loadRequests();
}
