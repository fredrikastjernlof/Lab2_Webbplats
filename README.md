# 📌 Laboration 2 – Webbplats som använder Fetch API (Frontend)

## 🧾 Beskrivning

Detta repository innehåller del 2 av Laboration 2 i kursen Backend-baserad webbutveckling.

Uppgiften går ut på att skapa en webbapplikation som konsumerar webbtjänsten som skapades i del 1.

Webbplatsen visar arbetserfarenheter i ett CV-format och gör det möjligt att:
- visa befintliga poster
- lägga till nya poster
- uppdatera poster
- radera poster

All data hämtas från och skickas till en extern REST-baserad webbtjänst.

---

## 🎯 Syfte

Syftet med uppgiften är att:

- Förstå hur en frontend-applikation kan kommunicera med en REST-baserad webbtjänst
- Använda Fetch API för att hämta, skicka, ändra och radera data (GET, POST, PUT, DELETE)
- Bygga en fristående webbapplikation med HTML, CSS och JavaScript
- Hantera och visa data dynamiskt i gränssnittet
- Implementera validering i JavaScript innan data skickas till webbtjänsten
- Skapa en användarvänlig lösning med tydliga felmeddelanden

---

## ⚙️ Tekniker

Projektet använder:

- HTML
- SCSS
- JavaScript
- Fetch API
- Vite
- Git & GitHub

---

## 🌐 Funktionalitet

Webbplatsen består av fyra undersidor:

### 🏠 Startsida (`index.html`)
- Hämtar och visar alla arbetserfarenheter från webbtjänsten (GET)
- Poster sorteras efter startdatum (nyast först)
- Möjlighet att radera poster (DELETE)
- Visar ett meddelande om inga poster finns

### ➕ Lägg till (`add.html`)
- Formulär för att skapa nya arbetserfarenheter (POST)
- Validering i JavaScript innan skickning
- Alla felmeddelanden visas samtidigt i en lista
- Felaktiga fält markeras visuellt

### ✏️ Ändra (`edit.html`)
- Hämtar en specifik post (GET)
- Förifyller formuläret
- Uppdaterar posten (PUT)
- Samma validering som vid skapande

### ℹ️ Om (`about.html`)
- Beskriver webbplatsens syfte och uppgift
- Information om teknikval
- Reflektioner och slutsatser

---

## 🔁 Kommunikation med API

Webbplatsen kommunicerar med följande webbtjänst:

[Öppna webbtjänst](https://lab2-webbtjanst.onrender.com/workexperience)

Följande metoder används:

- GET – hämta data
- POST – skapa ny post
- PUT – uppdatera post
- DELETE – radera post

All kommunikation sker via Fetch API och data hanteras i JSON-format.

---

## ✅ Validering

Validering sker i frontend innan anrop skickas:

- Alla obligatoriska fält kontrolleras
- Datum valideras (startdatum kan till exempel inte vara i framtiden)
- Logik för slutdatum/pågående hanteras
- Alla fel visas samtidigt i en lista
- Felaktiga fält markeras visuellt

Detta förbättrar användarupplevelsen och minskar risken för felaktig data.

---

## 🎨 Design & UX

- Webbplatsen är utformad som ett digitalt CV
- Layouten är responsiv och anpassad för både desktop och mobil
- Navigationen anpassas för mindre skärmar
- Formulär har tydlig feedback vid interaktion
- Knappar har hover- och active-effekter för bättre användarkänsla

---

## 🚀 Installation & körning

1. Klona repositoryt:

```bash
git clone https://github.com/fredrikastjernlof/Lab2_Webbplats.git
```

2. Installera dependencies:

```bash
npm install
```

3. Starta utvecklingsmiljön:

```bash
npm run dev
```

4. Bygg projektet:

```bash
npm run build
```

5. Förhandsgranska byggd version:

```bash
npm run preview
```
---

## 🌐 Publicering

Webbplatsen är publicerad via netlify:

[Öppna webbplats](Länk läggs till här efter publicering)

---

## 🔗 Koppling till backend

Backend-repository:

[Öppna backend-repository](https://github.com/fredrikastjernlof/Lab2_Webbtjanst) 

---

## ✅🙌 Det här tar jag med mig från uppgiften

- Jag har fått en mycket bättre förståelse för hur frontend och backend hänger ihop via ett REST API  
- Jag har arbetat med Fetch API i praktiken och tränat på hur man hanterar olika typer av anrop  
- Jag har fått tänka till mycket kring validering, särskilt hur viktigt det är att visa alla fel tydligt för användaren  
- En viktig insikt har varit säkerhet, till exempel att använda `textContent` istället för `innerHTML` för att undvika injection-problem  
- Jag har också blivit mer medveten om hur lätt det är att göra misstag, vilket gjort att jag arbetar mer noggrant och eftertänksamt med min kod 
- Uppgiften har gett mig en bättre förståelse för hur man bygger upp en webbapplikation på ett strukturerat och hållbart sätt  