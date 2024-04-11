import React from "react";

export function Index({}) {
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
  return (
    <div class="Login">
      <div>
        <label for="username">Username: </label>
        <input type="username" id="username" name="varUsername" />
      </div>
      <div>
        <label for="password">Password: </label>
        <input type="password" id="password" name="varPassword" />
      </div>
      <div>
        <a onClick={() => createUser()}>Create User</a>
        <a onClick={() => login()}>Login</a>
      </div>
    </div>
  );
}
