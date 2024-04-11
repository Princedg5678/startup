import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { Index } from "./index/index";
import { Main } from "./main/main";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <main>
          <Routes>
            <Route path="/" element={<Index />} exact />
            <Route path="/main" element={<Main />} exact />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
