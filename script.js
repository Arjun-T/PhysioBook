function showBooking() {
  document.getElementById("choice").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("book").style.display = "block";
}

function showRegister() {
  document.getElementById("choice").style.display = "none";
  document.getElementById("book").style.display = "none";
  document.getElementById("register").style.display = "block";
}

function goHome() {
  document.getElementById("book").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("choice").style.display = "block";
}

document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Form submitted! Backend integration pending.");
  });
});
