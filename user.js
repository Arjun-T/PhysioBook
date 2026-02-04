let currentUserId = null;

auth.onAuthStateChanged(user => {
  if (!user) return location.href = "index.html";
  currentUserId = user.uid;
  loadPhysios();
  loadBookings();
});

function logout() {
  auth.signOut().then(() => location.href = "index.html");
}

function showTab(id) {
  document.querySelectorAll(".tab-content").forEach(s => s.style.display = "none");
  document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
  document.getElementById(id).style.display = "block";
  event.target.classList.add("active");
}

async function loadPhysios() {
  const list = document.getElementById("physioList");
  list.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  const snap = await db.collection("physios").get();

  for (const doc of snap.docs) {
    const p = doc.data();

    let slotsText = "No slots today";
    const availDoc = await db.collection("availability").doc(doc.id).get();

    if (availDoc.exists && availDoc.data()[today]) {
      slotsText = availDoc.data()[today].join(", ");
    }

    const card = document.createElement("div");
    card.className = "card large";

    card.innerHTML = `
      <h3>${p.name}</h3>
      <p class="muted">${p.specialization}</p>

      <div class="info-row">
        <span>💰 ₹${p.price}</span>
        <span>⏱ ${slotsText}</span>
      </div>

      <button class="primary-btn">Book Appointment</button>
    `;

    card.querySelector("button").onclick = () => bookPhysio(doc.id);
    list.appendChild(card);
  }
}


async function bookPhysio(physioId) {
  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <div class="modal-card">
      <h3>Select Date</h3>
      <input type="date" id="bookDate">
      <div id="timeSlots" class="slot-grid"></div>
      <button class="primary-btn">Confirm</button>
    </div>
  `;

  document.body.appendChild(modal);

  let selectedTime = null;

  modal.querySelector("#bookDate").onchange = async e => {
    const slotsDiv = modal.querySelector("#timeSlots");
    slotsDiv.innerHTML = "";

    const doc = await db.collection("availability").doc(physioId).get();
    const slots = doc.data()?.[e.target.value];

    if (!slots) {
      slotsDiv.innerHTML = "<p>No slots</p>";
      return;
    }

    slots.forEach(t => {
      const b = document.createElement("button");
      b.innerText = t;
      b.onclick = () => {
        slotsDiv.querySelectorAll("button").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        selectedTime = t;
      };
      slotsDiv.appendChild(b);
    });
  };

  modal.querySelector(".primary-btn").onclick = async () => {
    if (!selectedTime) return alert("Select slot");

    await db.collection("bookings").add({
      userId: currentUserId,
      physioId,
      date: document.getElementById("bookDate").value,
      time: selectedTime,
      status: "pending",
      createdAt: new Date()
    });

    modal.remove();
    loadBookings();
  };
}

async function loadBookings() {
  const list = document.getElementById("bookingList");
  list.innerHTML = "";

  const snap = await db.collection("bookings")
    .where("userId", "==", currentUserId)
    .get();

  snap.forEach(() => {
    const c = document.createElement("div");
    c.className = "card large";
    c.innerHTML = `<p>Booking Requested</p>`;
    list.appendChild(c);
  });
}
