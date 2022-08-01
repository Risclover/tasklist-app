import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

let itemsArray = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

let projectsArray = localStorage.getItem("projects")
  ? JSON.parse(localStorage.getItem("projects"))
  : [];

localStorage.setItem("projects", JSON.stringify(projectsArray));
const PROJECTS = JSON.parse(localStorage.getItem("projects"));

localStorage.setItem("projects", JSON.stringify(PROJECTS));

localStorage.setItem("tasks", JSON.stringify(itemsArray));
const DATA = JSON.parse(localStorage.getItem("tasks"));

localStorage.setItem("tasks", JSON.stringify(DATA));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={DATA} projects={PROJECTS} />
  </React.StrictMode>
);
