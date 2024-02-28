const myUsername = getElementByID("Username");
const username = localStorage.getItem("userName");
myUsername.textContent = `Username: ${username}`;
