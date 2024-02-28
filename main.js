const myUsername = document.getElementById("Username");
const username = localStorage.getItem("userName");
myUsername.textContent = `Username: ${username}`;

let ratingList1 = {};
let ratingList2 = {};
let ratingList3 = {};
