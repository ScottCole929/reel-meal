import { App } from "./App";
import { React } from "react"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
