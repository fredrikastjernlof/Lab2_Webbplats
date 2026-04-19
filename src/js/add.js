"use strict"

// Funktion som sätter submit-lyssnaren
export function initAddForm() {

    // Hämta formuläret
    const form = document.getElementById("workexperience-form");

    //Eventlyssnare
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Hämta input
            const companyname = document.getElementById("companyname").value;
            const jobtitle = document.getElementById("jobtitle").value;
            const location = document.getElementById("location").value;
            const startdate = document.getElementById("startdate").value;
            const enddate = document.getElementById("enddate").value;
            const ongoing = document.getElementById("ongoing").checked;
            const description = document.getElementById("description").value;

            //Logga resultatet
            console.log({
                companyname,
                jobtitle,
                location,
                startdate,
                enddate,
                ongoing,
                description
            });
        });
    }
}