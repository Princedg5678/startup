async function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  const passwordEl = document.querySelector("#password");
  localStorage.setItem("password", passwordEl.value);

  const data = { username: nameEl.value, password: passwordEl.value };

  const response = await fetch("/api/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  if (response.status === 200) {
    window.location.href = "main.html";
  }
}

async function createUser() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  const passwordEl = document.querySelector("#password");
  localStorage.setItem("password", passwordEl.value);

  const data = { username: nameEl.value, password: passwordEl.value };

  const response = await fetch("/api/create", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  if (response.status === 200) {
    window.location.href = "main.html";
  }
}

let socket;

//Reconfigure these to work with my code:
function configureWebSocket() {
  const protocol = window.location.protocol === "http:" ? "ws" : "wss";
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = (event) => {
    displayMsg("system", "game", "connected");
  };
  socket.onclose = (event) => {
    displayMsg("system", "game", "disconnected");
  };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    if (msg.type === GameEndEvent) {
      displayMsg("player", msg.from, `scored ${msg.value.score}`);
    } else if (msg.type === GameStartEvent) {
      displayMsg("player", msg.from, `started a new game`);
    }
  };
}

function displayMsg(cls, from, msg) {
  const chatText = document.querySelector("#player-messages");
  chatText.innerHTML =
    `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` +
    chatText.innerHTML;
}

function broadcastEvent(from, type, value) {
  const event = {
    from: from,
    type: type,
    value: value,
  };
  socket.send(JSON.stringify(event));
}
