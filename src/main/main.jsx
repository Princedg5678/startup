import React from "react";

export function Main({}) {
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
  return (
    <div>
      <header>
        <div>
          <nav>
            <a onclick="logout()">Logout</a>
            <p id="Username">Username:</p>
          </nav>
        </div>

        <div>
          <h1>Blast Zone Cafe Menu Rater</h1>
        </div>

        <p>
          This is a site where you can rate possible future menu items!! Your
          feedback will help you to shape the menu!
        </p>
      </header>
      <aside>
        <p>
          Please give each possible menu item a rating from 1-10. (1 = Blegh!,
          10 = ADD THIS IMMEDIATELY!!!)
        </p>
        <table>
          <tr>
            <th>
              <img
                alt="burger"
                src="https://gardenavalleynews.org/wp-content/uploads/2014/04/Burger.jpg"
              />
            </th>
            <th>
              <img
                alt="steak"
                src="https://www.thespruceeats.com/thmb/X0Q76ZRZOBVryjd3QSr0gcsiIFA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GrilledFlatIronSteak-StevenMorrisPhotography-GettyImages-5c62f355c9e77c0001d32301.jpg"
              />
            </th>
            <th>
              <img
                alt="milkshake"
                src="https://previews.123rf.com/images/nikolayzaiarnyi/nikolayzaiarnyi1806/nikolayzaiarnyi180600005/102944365-chocolate-extreme-milkshake-with-brownie-cake-chocolate-paste-and-sweets-crazy-freakshake-food-trend.jpg"
              />
            </th>
          </tr>
          <tr>
            <th>Big Bang Burger</th>
            <th>Sirloin Showstopper</th>
            <th>Chocoholic Explosion Shake</th>
          </tr>
          <tr>
            <th>
              <input id="rating1" type="number" min="1" max="10" />
              <button onClick="rateItem(1)">Submit</button>
            </th>
            <th>
              <input id="rating2" type="number" min="1" max="10" />
              <button onClick="rateItem(2)">Submit</button>
            </th>
            <th>
              <input id="rating3" type="number" min="1" max="10" />
              <button onClick="rateItem(3)">Submit</button>
            </th>
          </tr>
          <tr>
            <th id="average1">Average Rating: TBA</th>
            <th id="average2">Average Rating: TBA</th>
            <th id="average3">Average Rating: TBA</th>
          </tr>
        </table>
      </aside>
      <div id="messageContainer"></div>
      <footer>
        <p id="dadJoke"></p>
        <a href="https://github.com/Princedg5678/startup">Devyn Giles Github</a>
      </footer>
    </div>
  );
}
