function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  const passwordEl = document.querySelector("#password");
  localStorage.setItem("password", passwordEl.value);
  window.location.href = "main.html";
}