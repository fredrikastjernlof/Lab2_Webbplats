"use strict"

import { getExperiences } from "./index";
import { initAddForm } from "./add";

const list = document.getElementById("experience-list");
const form = document.getElementById("workexperience-form");

if (list) {
  getExperiences();
}

if (form) {
  initAddForm();
}

