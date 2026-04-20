"use strict";

import { getExperiences } from "./index.js";
import { initAddForm } from "./add.js";
import { initEdit } from "./edit.js";

const list = document.getElementById("experience-list");
const path = window.location.pathname;

// Index-sidan
if (list) {
  getExperiences();
}

// Add-sidan
if (path.includes("add")) {
  initAddForm();
}

// Edit-sidan
if (path.includes("edit")) {
  initEdit();
}