import React from "react";

export function Index({}) {
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
        <a onclick="createUser()">Create User</a>
        <a onclick="login()">Login</a>
      </div>
    </div>
  );
}
