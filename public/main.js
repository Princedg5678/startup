const myUsername = document.getElementById("Username");
let username = localStorage.getItem("userName");
myUsername.textContent = `Username: ${username}`;
const url = "/api/user";
/*fetch(url)
  .then((x) => x.json())
  .then((response) => {
    //console.log(response);
    username = response.username;
  }); */

//let ratingLists = {};
async function getListFromServer() {
  let response = await fetch("/api/rating");
  ratingLists = await response.json();
  console.log(ratingLists);
  return ratingLists;
}

async function updateList(ratingLists) {
  let item = ratingLists.ratingList1;
  let avg = document.getElementById("average1");
  let newAverage = findAverageRating(item).toFixed(1);
  avg.textContent = "Average Rating: " + newAverage;

  item = ratingLists.ratingList2;
  avg = document.getElementById("average2");
  newAverage = findAverageRating(item).toFixed(1);
  avg.textContent = "Average Rating: " + newAverage;

  item = ratingLists.ratingList3;
  avg = document.getElementById("average3");
  newAverage = findAverageRating(item).toFixed(1);
  avg.textContent = "Average Rating: " + newAverage;
}

async function rateItem(item) {
  let ratingLists = await getListFromServer();
  const ID = "rating" + item;
  const rating = Number(document.getElementById(ID).value);
  const key = "ratingList" + item;
  //console.log(rating);
  //ratingLists[key] = [];
  ratingLists[key].push(rating);

  const data = { storedRating: rating, storedKey: key };

  const response = await fetch("/api/rating", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    console.log("Posted Rating");
  }

  const realItem = ratingLists[key];
  const aID = "average" + item;
  const avg = document.getElementById(aID);
  const newAverage = findAverageRating(realItem).toFixed(1);
  avg.textContent = "Average Rating: " + newAverage;
  broadcastEvent(username, "rate");
}

function findAverageRating(ratings) {
  //const key = "ratingList" + item;
  // const ratings = ratingLists[key];
  console.log(ratings);
  let sum = 0;
  for (let rating of ratings) {
    sum = sum + rating;
  }
  let average = sum / ratings.length;
  return average;
}

let iterations = 0;

/*
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
*/

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
let socket;
//Reconfigure these to work with my code:
async function configureWebSocket() {
  const protocol = window.location.protocol === "http:" ? "ws" : "wss";
  socket = await new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = (event) => {
    displayMsg(username, " connected to server!");
  };
  socket.onclose = (event) => {
    displayMsg(username, " disconnected.");
  };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    if (msg.type === "rate") {
      displayMsg(msg.username, " has rated!");
    } else if (msg.type === "join") {
      displayMsg(msg.username, " has joined!");
    }
  };
}

function displayMsg(username, msg) {
  const chatText = document.querySelector("#messageContainer");
  chatText.innerHTML =
    `<div class="event"><span class="player-event">${username}</span>${msg}</div>` +
    chatText.innerHTML;
  iterations++;
  if (iterations > 5) {
    const message = document.querySelector(".event");
    console.log(message);
    chatText.removeChild(message);
  }
}

function broadcastEvent(username, type) {
  const event = {
    type: type,
    username: username,
  };
  socket.send(JSON.stringify(event));
}

configureWebSocket();

(async () => {
  let list = await getListFromServer();
  updateList(list);
})();
