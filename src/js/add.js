"use strict"

// Funktion som sätter submit-lyssnaren
export function initAddForm() {

    // Hämta formuläret
    const form = document.getElementById("workexperience-form");

    //Eventlyssnare
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Hämta input
            const companyname = document.getElementById("companyname").value;
            const jobtitle = document.getElementById("jobtitle").value;
            const location = document.getElementById("location").value;
            const startdate = document.getElementById("startdate").value;
            const enddate = document.getElementById("enddate").value;
            const ongoing = document.getElementById("ongoing").checked;
            const description = document.getElementById("description").value;

            const today = new Date().toISOString().split("T")[0];

            // Validering
            if (startdate > today) {
                console.log("Fel: startdatum kan inte vara i framtiden");
                return;
            }

            if (!ongoing && !enddate) {
                console.log("Fel: ange slutdatum eller välj pågående");
                return;
            }

            if (ongoing && enddate) {
                console.log("Fel: välj antingen slutdatum eller pågående, inte båda");
                return;
            }

            if (!ongoing && enddate && startdate > enddate) {
                console.log("Fel: startdatum måste vara före slutdatum");
                return;
            }

            // Lägg till POST i db
            await fetch("https://lab2-webbtjanst.onrender.com/workexperience", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    companyname,
                    jobtitle,
                    location,
                    startdate,
                    enddate: ongoing ? null : enddate,
                    description
                })
            });

            console.log("Post skickad!");

        });
    }
}
