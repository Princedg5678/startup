import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { Index } from "./index/index";
import { Main } from "./main/main";

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
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

        <main>
          <Routes>
            <Route path="/" element={<Index />} exact />
            <Route path="/" element={<Main />} exact />
          </Routes>
        </main>

        <footer>
          <p id="dadJoke"></p>
          <a href="https://github.com/Princedg5678/startup">
            Devyn Giles Github
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}
