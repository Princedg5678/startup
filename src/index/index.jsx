import React from "react";
import { useNavigate } from "react-router-dom";

export function Index({}) {
  const [username, updateUsername] = React.useState("");
  const [password, updatePassword] = React.useState("");

  const navigate = useNavigate();

  async function login() {
    //const nameEl = document.querySelector("#username");
    localStorage.setItem("userName", username);
    //const passwordEl = document.querySelector("#password");
    localStorage.setItem("password", password);

    const data = { username: username, password: password };

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
      //window.location.href = "main";
      navigate("/main");
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
      //window.location.href = "main";
      navigate("/main");
    }
  }
  return (
    <div className="Login">
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="username"
          id="username"
          name="varUsername"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="varPassword"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
        />
      </div>
      <div>
        <a onClick={() => createUser()}>Create User</a>
        <a onClick={() => login()}>Login</a>
      </div>
    </div>
  );
}
