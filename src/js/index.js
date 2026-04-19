"use strict"

const url = "https://lab2-webbtjanst.onrender.com/workexperience";

// Gör Fetch-anrop som hämtar alla poster i databasen
export async function getExperiences() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const list = document.getElementById("experience-list");

        list.innerHTML = ""; // töm listan först

        // Loopa genom alla objekt och skriv ut i DOM
        data.forEach((item) => {
            const li = document.createElement("li");
            li.classList.add("experience-item");

            //Snygga till datum-presentationen lite
            const start = item.startdate.split("T")[0];
            const end = item.enddate ? item.enddate.split("T")[0] : "Pågående";

            li.innerHTML = `
        <h3>${item.companyname}</h3>
        <p>${item.jobtitle} - ${item.location}</p>
        <p>${start} - ${end}</p>
        <p>${item.description}</p>
        <button data-id="${item.id}" class="delete-btn">Ta bort</button>
      `;

            const deleteBtn = li.querySelector(".delete-btn");
            
            // Eventlyssnare för att ta bort arbetserfarenhet
            deleteBtn.addEventListener("click", () => {
                const id = deleteBtn.dataset.id;
                deleteExperience(id);
            });

            list.appendChild(li);
        });

    } catch (error) {
        console.error("Fel vid hämtning:", error);
    }
}

// Ta bort arbetserfarenheter från cv
async function deleteExperience(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE"
        });

        getExperiences();
    } catch (error) {
        console.error("Fel vid borttagning:", error);
    }
}
