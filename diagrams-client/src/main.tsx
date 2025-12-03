import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import View from "./pages/View.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/Neetcode-150">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
