"use strict";

const url = "https://lab2-webbtjanst.onrender.com/workexperience";

// Funktion som initierar edit-sidan
export async function initEdit() {

    // Hämta id från URL (edit.html?id=...)
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Hämta formuläret
    const form = document.getElementById("workexperience-form");

    try {
        // Hämta specifik post från API
        const response = await fetch(`${url}/${id}`);
        const item = await response.json();

        // Fyll formuläret med befintlig data
        document.getElementById("companyname").value = item.companyname;
        document.getElementById("jobtitle").value = item.jobtitle;
        document.getElementById("location").value = item.location;
        document.getElementById("startdate").value = item.startdate.split("T")[0];
        document.getElementById("enddate").value = item.enddate ? item.enddate.split("T")[0] : "";
        document.getElementById("ongoing").checked = !item.enddate;
        document.getElementById("description").value = item.description;

    } catch (error) {
        console.error("Fel vid hämtning av post:", error);
    }

    // Eventlyssnare för att uppdatera posten
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = "Sparar...";

            // Hämta inputvärden
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
                submitButton.textContent = "Spara ändringar";
                return;
            }

            if (!ongoing && !enddate) {
                console.log("Fel: ange slutdatum eller välj pågående");
                submitButton.disabled = false;
                submitButton.textContent = "Spara ändringar";
                return;
            }

            if (ongoing && enddate) {
                console.log("Fel: välj antingen slutdatum eller pågående, inte båda");
                submitButton.disabled = false;
                submitButton.textContent = "Spara ändringar";
                return;
            }

            if (!ongoing && enddate && startdate > enddate) {
                console.log("Fel: startdatum måste vara före slutdatum");
                submitButton.disabled = false;
                submitButton.textContent = "Spara ändringar";
                return;
            }

            try {
                // Skicka PUT-anrop för att uppdatera posten
                await fetch(`${url}/${id}`, {
                    method: "PUT",
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

                // Skicka tillbaka användaren till startsidan
                window.location.href = "index.html";

            } catch (error) {
                console.error("Fel vid uppdatering:", error);
                submitButton.disabled = false;
                submitButton.textContent = "Spara ändringar";
            }
        });
    }
}