let selectedRole = null;

function selectRole(role) {
  selectedRole = role;
  document.getElementById("roleSelect").style.display = "none";
  document.getElementById("authForm").style.display = "block";
}

// Auto-redirect if already logged in
auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const doc = await db.collection("users").doc(user.uid).get();
  if (!doc.exists) return;

  const role = doc.data().role;
  redirectToProfile(role);
});

document.getElementById("authForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Try login
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const userDoc = await db.collection("users").doc(cred.user.uid).get();
    redirectToProfile(userDoc.data().role);

  } catch {
    // If login fails → register
    const cred = await auth.createUserWithEmailAndPassword(email, password);

    await db.collection("users").doc(cred.user.uid).set({
      name,
      email,
      role: selectedRole,
      createdAt: new Date()
    });

    redirectToProfile(selectedRole);
  }
});

function redirectToProfile(role) {
  if (role === "user") location.href = "user.html";
  else location.href = "physio.html";
}
