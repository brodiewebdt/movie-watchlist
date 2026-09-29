import { movies } from "../data.js";

// =================================================
// DOM References
// =================================================
const cardGrid = document.querySelector("#results");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filter");
const sortSelect = document.querySelector("#sort");

// =================================================
// State
// =================================================
const state = {
  movies,
  searchTerm: "",
  filterBy: "all",
  sortBy: "default",
  currentStatus: "all",
};

// =================================================
// Populate Filter Select Options
// =================================================
function createFilterSelectOptions() {
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All";
  filterSelect.appendChild(allOption);
  const uniqueGenres = [...new Set(movies.map((movie) => movie.genre))];

  console.log(uniqueGenres);

  uniqueGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.toLowerCase();
    option.textContent = genre;

    filterSelect.appendChild(option);
  });
}

// =================================================
// Sort Select Options
// =================================================
function createSortSelectOptions() {
  const defaultOption = document.createElement("option");
  defaultOption.value = "default";
  defaultOption.textContent = "Default";
  sortSelect.appendChild(defaultOption);

  const runtimeOption = document.createElement("option");
  runtimeOption.value = "runtime";
  runtimeOption.textContent = "Runtime";
  sortSelect.appendChild(runtimeOption);

  const yearOption = document.createElement("option");
  yearOption.value = "year";
  yearOption.textContent = "Release Year";
  sortSelect.appendChild(yearOption);
}

// =================================================
// Card Creation
// =================================================
function createCardDetail(labelText, valueText) {
  const detail = document.createElement("p");

  const label = document.createElement("span");
  label.textContent = `${labelText}: `;
  label.classList.add("detail-label");

  const value = document.createElement("span");
  value.textContent = valueText;
  value.classList.add("detail-value");

  detail.append(label, value);

  return detail;
}

function createCard(movie) {
  const card = document.createElement("article");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.textContent = movie.title;

  const year = createCardDetail("Release Year", movie.year);
  const genre = createCardDetail("Genre", movie.genre);
  const runtime = createCardDetail("Runtime", `${movie.runtime} minutes`);
  const status = createCardDetail(
    "Viewing Status",
    movie.watched ? "Watched" : "Unwatched",
  );

  card.append(title, year, genre, runtime, status);

  return card;
}

function renderCardList(movies) {
  emptyState.classList.add("hidden");
  cardGrid.innerHTML = "";

  if (movies.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  movies.forEach((item) => {
    const card = createCard(item);
    cardGrid.append(card);
  });
}

// =================================================
// Event Listeners
// =================================================
filterSelect.addEventListener("change", (e) => {
  state.filterBy = e.target.value;
  console.log(state.filterBy);
});

searchInput.addEventListener("input", (e) => {
  state.searchTerm = e.target.value;
  console.log(state.searchTerm);
});

sortSelect.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  console.log(state.sortBy);
});

// =================================================
// Initialization
// =================================================
function init() {
  createFilterSelectOptions();
  createSortSelectOptions();
  renderCardList(movies);
}

init();
