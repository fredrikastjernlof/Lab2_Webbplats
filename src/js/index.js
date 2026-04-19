"use strict"

const url = "https://lab2-webbtjanst.onrender.com/workexperience";

// Gör Fetch-anrop som hämtar alla poster i databasen
export async function getExperiences() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Sortera nyast först
        data.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));

        const list = document.getElementById("experience-list");

        list.innerHTML = ""; // töm listan först

        // Om det inte finns några poster att visa i databasen
        if (data.length === 0) {
            const li = document.createElement("li");
            li.textContent = "Du har inte lagt till några arbetserfarenheter ännu.";
            li.classList.add("empty-message");
            list.appendChild(li);
            return;
        }

        // Loopa genom alla objekt och skriv ut i DOM
        data.forEach((item) => {
            const li = document.createElement("li");
            li.classList.add("experience-item");

            //Snygga till datum-presentationen lite
            const start = item.startdate.split("T")[0];
            const end = item.enddate ? item.enddate.split("T")[0] : "Pågående";

            const title = document.createElement("h3");
            title.textContent = item.companyname;

            const info = document.createElement("p");
            info.textContent = `${item.jobtitle} - ${item.location}`;

            const dates = document.createElement("p");
            dates.textContent = `${start} - ${end}`;

            const desc = document.createElement("p");
            desc.textContent = item.description;

            const editLink = document.createElement("a");
            editLink.href = `edit.html?id=${item.id}`;
            editLink.classList.add("edit-btn");
            editLink.textContent = "Ändra";

            const deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.dataset.id = item.id;
            deleteBtn.textContent = "Ta bort";

            li.appendChild(title);
            li.appendChild(info);
            li.appendChild(dates);
            li.appendChild(desc);
            li.appendChild(editLink);
            li.appendChild(deleteBtn);

            // Eventlyssnare för att ta bort arbetserfarenhet
            deleteBtn.addEventListener("click", () => {
                const id = deleteBtn.dataset.id;
                const confirmed = confirm("Är du säker på att du vill ta bort posten?");

                if (confirmed) {
                    deleteExperience(id);
                }
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
