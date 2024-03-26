const myUsername = document.getElementById("Username");
let username = "";
const url = "/api/user";
/*fetch(url)
  .then((x) => x.json())
  .then((response) => {
    //console.log(response);
    username = response.username;
    myUsername.textContent = `Username: ${username}`;
  }); */

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

let iterations = 0;

setInterval(() => {
  const chatText = document.querySelector("#messageContainer");
  chatText.innerHTML =
    `<div class="event"><span class="player-event">Devyn</span> has rated!</div>` +
    chatText.innerHTML;
  iterations++;
  if (iterations > 5) {
    const message = document.querySelector(".event");
    console.log(message);
    chatText.removeChild(message);
  }
}, 5000);

async function fetchJoke() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "text/plain",
    },
  });
  const text = await response.text();
  document.getElementById("dadJoke").textContent =
    "Dad Joke of the Day: " + text;
}

window.onload = fetchJoke;

async function logout() {
  const response = await fetch("/api/logout", {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });

  window.location.href = "index.html";
}
