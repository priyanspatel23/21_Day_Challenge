const section = document.getElementById("bg");
for (let i = 0; i < 150; i++) {
  const span = document.createElement("span");
  section.appendChild(span);
}
const popup = document.getElementById("popup");
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;
  if (username.value === "") {
    showError(username, "Required");
    valid = false;
  } else {
    showError(username, "");
  }
  if (email.value === "") {
    showError(email, "Required");
    valid = false;
  } else {
    showError(email, "");
  }
  if (password.value === "") {
    showError(password, "Required");
    valid = false;
  } else {
    showError(password, "");
  }
  if (confirmPassword.value !== password.value || confirmPassword.value === "") {
    showError(confirmPassword, "Not match");
    valid = false;
  } else {
    showError(confirmPassword, "");
  }
  if (valid) {
    alert("Form Submitted 🚀");
  }
});
function showError(input, message) {
  const small = input.parentElement.querySelector("small");
  small.innerText = message;
}
function showPopup() {
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}