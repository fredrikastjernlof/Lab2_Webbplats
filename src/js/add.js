"use strict";

// Funktion som sätter submit-lyssnaren
export function initAddForm() {
    // Hämta formuläret
    const form = document.getElementById("workexperience-form");

    // Eventlyssnare
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = "Sparar...";

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
                submitButton.disabled = false;
                submitButton.textContent = "Spara";
                return;
            }

            if (!ongoing && !enddate) {
                console.log("Fel: ange slutdatum eller välj pågående");
                submitButton.disabled = false;
                submitButton.textContent = "Spara";
                return;
            }

            if (ongoing && enddate) {
                console.log("Fel: välj antingen slutdatum eller pågående, inte båda");
                submitButton.disabled = false;
                submitButton.textContent = "Spara";
                return;
            }

            if (!ongoing && enddate && startdate > enddate) {
                console.log("Fel: startdatum måste vara före slutdatum");
                submitButton.disabled = false;
                submitButton.textContent = "Spara";
                return;
            }

            try {
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
                window.location.href = "index.html";
            } catch (error) {
                console.error("Fel uppstod när formuläret skulle skickas:", error);
                submitButton.disabled = false;
                submitButton.textContent = "Spara";
            }
        });
    }
}