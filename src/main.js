"use strict"

const url = "https://lab2-webbtjanst.onrender.com/workexperience";

async function getExperiences() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

  } catch (error) {
    console.error("Fel vid hämtning:", error);
  }
}

getExperiences();