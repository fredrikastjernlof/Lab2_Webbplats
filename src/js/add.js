"use strict"

// Funktion som sätter submit-lyssnaren
export function initAddForm() {

    const form = document.getElementById("workexperience-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("submit fungerar");
        });
    }

}