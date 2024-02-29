const myUsername = document.getElementById("Username");
const username = localStorage.getItem("userName");
myUsername.textContent = `Username: ${username}`;

let ratingLists = { ratingList1: [], ratingList2: [], ratingList3: [] };

// const rating1 = document.getElementById("Username");
// const rating2 = document.getElementById("Username");
// const rating3 = document.getElementById("Username");

function rateItem(item) {
  const ID = "rating" + item;
  const rating = document.getElementById(ID).value;
  const key = "ratingList" + item;
  ratingLists[key].add(rating);
}
