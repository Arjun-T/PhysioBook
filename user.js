auth.onAuthStateChanged(async user => {
  if (!user) location.href = "index.html";

  const snap = await db.collection("physios").get();
  const list = document.getElementById("physioList");

  snap.forEach(doc => {
    const p = doc.data();
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.specialization}</p>
      <p>₹${p.price}</p>
      <button class="btn">Book</button>
    `;
    card.querySelector("button").onclick = () => bookPhysio(user.uid, doc.id);
    list.appendChild(card);
  });
});

function bookPhysio(userId, physioId) {
  db.collection("bookings").add({
    userId,
    physioId,
    status: "pending",
    createdAt: new Date()
  });
  alert("Booking requested!");
}
