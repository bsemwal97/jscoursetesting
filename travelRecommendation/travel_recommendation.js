"use strict";

const destinationTimeZones = {
  "Sydney, Australia": "Australia/Sydney",
  "Melbourne, Australia": "Australia/Melbourne",
  "Tokyo, Japan": "Asia/Tokyo",
  "Kyoto, Japan": "Asia/Tokyo",
  "Rio de Janeiro, Brazil": "America/Sao_Paulo",
  "São Paulo, Brazil": "America/Sao_Paulo",
  "Angkor Wat, Cambodia": "Asia/Phnom_Penh",
  "Taj Mahal, India": "Asia/Kolkata",
  "Bora Bora, French Polynesia": "Pacific/Tahiti",
  "Copacabana Beach, Brazil": "America/Sao_Paulo",
};

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsSection = document.getElementById("resultsSection");
const results = document.getElementById("results");
let travelDataPromise;

function loadTravelData() {
  if (!travelDataPromise) {
    travelDataPromise = fetch("./travel_recommendation_api.json")
      .then((response) => {
        if (!response.ok)
          throw new Error(`Data request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Travel recommendation data:", data);
        return data;
      })
      .catch((error) => {
        travelDataPromise = undefined;
        throw error;
      });
  }
  return travelDataPromise;
}

function getRecommendations(data, keyword) {
  if (["beach", "beaches"].includes(keyword))
    return { category: "Beaches", places: data.beaches };
  if (["temple", "temples"].includes(keyword))
    return { category: "Temples", places: data.temples };
  if (["country", "countries"].includes(keyword)) {
    return {
      category: "Countries",
      places: data.countries.flatMap((country) => country.cities),
    };
  }
  const country = data.countries.find(
    (item) => item.name.toLowerCase() === keyword,
  );
  if (country) return { category: country.name, places: country.cities };
  return { category: "No matching destinations", places: [] };
}

function displayRecommendations(places, category) {
  results.replaceChildren();
  places.forEach((place) => {
    const card = document.createElement("article");
    card.className = "result-card";
    const img = document.createElement("img");
    img.src = place.imageUrl;
    img.alt = place.name;
    img.loading = "lazy";
    const body = document.createElement("div");
    body.className = "result-body";
    const tag = document.createElement("span");
    tag.className = "eyebrow";
    tag.textContent = category;
    const title = document.createElement("h3");
    title.textContent = place.name;
    const description = document.createElement("p");
    description.textContent = place.description;
    const time = document.createElement("div");
    time.className = "local-time";
    time.textContent =
      "Local date & time: " +
      new Date().toLocaleString("en-US", {
        timeZone: destinationTimeZones[place.name],
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    body.append(tag, title, description, time);
    card.append(img, body);
    results.appendChild(card);
  });
}

let searchVersion = 0;
async function searchRecommendations(event) {
  event.preventDefault();
  const version = ++searchVersion;
  const keyword = searchInput.value.trim().toLowerCase();
  const status = document.getElementById("searchStatus");
  const heading = document.getElementById("resultsHeading");
  const count = document.getElementById("resultCount");
  resultsSection.hidden = false;
  results.replaceChildren();
  count.textContent = "";
  heading.textContent = "Places to discover";
  if (!keyword) {
    status.textContent = "Enter beach, temple or country to begin your search.";
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  status.textContent = "Finding your next escape…";
  try {
    const data = await loadTravelData();
    if (version !== searchVersion) return;
    const { category, places } = getRecommendations(data, keyword);
    heading.textContent = category;
    status.textContent = places.length
      ? ""
      : "No results found. Try beach, temple, country, Australia, Japan or Brazil.";
    count.textContent = places.length
      ? `${places.length} places to spark your curiosity`
      : "";
    displayRecommendations(places, category);
  } catch (error) {
    if (version !== searchVersion) return;
    console.error("Unable to load recommendations:", error);
    status.textContent =
      "Could not load recommendations. Please try searching again.";
  }
  if (version === searchVersion)
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearRecommendations() {
  searchVersion++;
  searchInput.value = "";
  results.replaceChildren();
  document.getElementById("searchStatus").textContent = "";
  document.getElementById("resultCount").textContent = "";
  resultsSection.hidden = true;
  searchInput.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (searchForm) {
  searchForm.addEventListener("submit", searchRecommendations);
  document
    .getElementById("resetBtn")
    .addEventListener("click", clearRecommendations);
  loadTravelData().catch((error) =>
    console.error("Initial data load failed:", error),
  );
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("contactStatus").textContent =
      "Thank you! Demo submission complete. Your message has not been sent or stored.";
    contactForm.reset();
  });
}
