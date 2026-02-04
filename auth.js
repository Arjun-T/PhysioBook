document.getElementById("authForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const role = roleSelect.value;

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    const uid = cred.user.uid;

    await db.collection("users").doc(uid).set({
      name,
      email,
      role
    });

    if (role === "user") location.href = "user.html";
    else location.href = "physio.html";

  } catch (err) {
    // If already exists → login
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const uid = cred.user.uid;

    const doc = await db.collection("users").doc(uid).get();
    const role = doc.data().role;

    location.href = role === "user" ? "user.html" : "physio.html";
  }
});
