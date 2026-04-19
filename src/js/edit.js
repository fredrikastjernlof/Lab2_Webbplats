"use strict";

const url = "https://lab2-webbtjanst.onrender.com/workexperience";

// Funktion som initierar edit-sidan
export async function initEdit() {

    // Hämta id från URL (edit.html?id=...)
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Hämta formuläret
    const form = document.getElementById("workexperience-form");

    if (!form) return;

    // Hämta formulärfält
    const companyInput = document.getElementById("companyname");
    const jobtitleInput = document.getElementById("jobtitle");
    const locationInput = document.getElementById("location");
    const startdateInput = document.getElementById("startdate");
    const enddateInput = document.getElementById("enddate");
    const ongoingInput = document.getElementById("ongoing");
    const descriptionInput = document.getElementById("description");
    const message = document.getElementById("form-message");

    // Ta bort röd markering när användaren ändrar i fält
    companyInput.addEventListener("input", () => companyInput.classList.remove("input-error"));
    jobtitleInput.addEventListener("input", () => jobtitleInput.classList.remove("input-error"));
    locationInput.addEventListener("input", () => locationInput.classList.remove("input-error"));
    startdateInput.addEventListener("input", () => startdateInput.classList.remove("input-error"));
    enddateInput.addEventListener("input", () => enddateInput.classList.remove("input-error"));
    descriptionInput.addEventListener("input", () => descriptionInput.classList.remove("input-error"));

    // När checkbox ändras, ta bort fel på slutdatum
    ongoingInput.addEventListener("change", () => {
        enddateInput.classList.remove("input-error");
    });

    try {
        // Hämta specifik post från API
        const response = await fetch(`${url}/${id}`);
        const item = await response.json();

        // Fyll formuläret med befintlig data
        companyInput.value = item.companyname;
        jobtitleInput.value = item.jobtitle;
        locationInput.value = item.location;
        startdateInput.value = item.startdate.split("T")[0];
        enddateInput.value = item.enddate ? item.enddate.split("T")[0] : "";
        ongoingInput.checked = !item.enddate;
        descriptionInput.value = item.description;

    } catch (error) {
        console.error("Fel vid hämtning av post:", error);
    }

    // Eventlyssnare för att uppdatera posten
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        message.innerHTML = "";

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Sparar...";

        // Hämta inputvärden
        const companyname = companyInput.value;
        const jobtitle = jobtitleInput.value;
        const location = locationInput.value;
        const startdate = startdateInput.value;
        const enddate = enddateInput.value;
        const ongoing = ongoingInput.checked;
        const description = descriptionInput.value;

        const today = new Date().toISOString().split("T")[0];

        // Samla alla fel i en array
        const errors = [];

        // Rensa gamla felmarkeringar
        const inputs = form.querySelectorAll("input, textarea");

        inputs.forEach((input) => {
            input.classList.remove("input-error");
        });

        // Validering textfält
        if (!companyname.trim()) {
            errors.push("Företagsnamn måste fyllas i.");
            companyInput.classList.add("input-error");
        }

        if (!jobtitle.trim()) {
            errors.push("Jobbtitel måste fyllas i.");
            jobtitleInput.classList.add("input-error");
        }

        if (!location.trim()) {
            errors.push("Plats måste fyllas i.");
            locationInput.classList.add("input-error");
        }

        if (!description.trim()) {
            errors.push("Beskrivning måste fyllas i.");
            descriptionInput.classList.add("input-error");
        }

        // Validering datum
        if (!startdate) {
            errors.push("Startdatum måste fyllas i.");
            startdateInput.classList.add("input-error");
        }

        if (startdate && startdate > today) {
            errors.push("Startdatum kan inte vara i framtiden.");
            startdateInput.classList.add("input-error");
        }

        if (!ongoing && !enddate) {
            errors.push("Ange slutdatum eller välj pågående.");
            enddateInput.classList.add("input-error");
        }

        if (ongoing && enddate) {
            errors.push("Välj antingen slutdatum eller pågående, inte båda.");
            enddateInput.classList.add("input-error");
        }

        if (!ongoing && startdate && enddate && startdate > enddate) {
            errors.push("Startdatum måste vara före slutdatum.");
            startdateInput.classList.add("input-error");
            enddateInput.classList.add("input-error");
        }

        // Visa alla fel på en gång
        if (errors.length > 0) {
            const ul = document.createElement("ul");

            errors.forEach((errorText) => {
                const li = document.createElement("li");
                li.textContent = errorText;
                ul.appendChild(li);
            });

            message.appendChild(ul);

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