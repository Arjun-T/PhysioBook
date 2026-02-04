auth.onAuthStateChanged(async user => {
  if (!user) location.href = "index.html";

  const bookings = await db
    .collection("bookings")
    .where("physioId", "==", user.uid)
    .get();

  document.getElementById("stats").innerText =
    `Total bookings: ${bookings.size}`;
});
