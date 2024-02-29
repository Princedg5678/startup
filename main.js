const myUsername = document.getElementById("Username");
const username = localStorage.getItem("userName");
myUsername.textContent = `Username: ${username}`;

let ratingLists = { ratingList1: [], ratingList2: [], ratingList3: [] };

function rateItem(item) {
  const ID = "rating" + item;
  const rating = Number(document.getElementById(ID).value);
  const key = "ratingList" + item;
  ratingLists[key].push(rating);

  const aID = "average" + item;
  const avg = document.getElementById(aID);
  const newAverage = findAverageRating(item).toFixed(1);
  avg.textContent = "Average Rating: " + newAverage;
}

function findAverageRating(item) {
  const key = "ratingList" + item;
  const ratings = ratingLists[key];
  let sum = 0;
  for (rating of ratings) {
    sum = sum + rating;
  }
  let average = sum / ratings.length;
  return average;
}

/*
setInterval(() => {
  const score = Math.floor(Math.random() * 3000);
  const chatText = document.querySelector("#player-messages");
  chatText.innerHTML =
    `<div class="event"><span class="player-event">Eich</span> scored ${score}</div>` +
    chatText.innerHTML;
}, 5000);
*/
