import { movies } from "../data.js";

// =================================================
// DOM References
// =================================================
const cardGrid = document.querySelector("#results");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filter");
const sortSelect = document.querySelector("#sort");
const statusForm = document.querySelector("#status-form");
const resultsCount = document.querySelector("#results-count");

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

  uniqueGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.toLowerCase();
    option.textContent = genre;

    filterSelect.appendChild(option);
  });
}

// =================================================
// Populate Sort Select Options
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
// Watch Status Form Creation
// =================================================
function createWatchStatusForm() {
  const allLabel = document.createElement("label");
  allLabel.htmlFor = "all";
  allLabel.textContent = "All";
  const allInput = document.createElement("input");
  allInput.type = "radio";
  allInput.id = "all";
  allInput.name = "watch-status";
  allInput.value = "all";
  allInput.dataset.watched = "all";
  allInput.checked = true;

  const watchedLabel = document.createElement("label");
  watchedLabel.textContent = "Watched";
  const watchedInput = document.createElement("input");
  watchedInput.type = "radio";
  watchedInput.id = "watched";
  watchedInput.name = "watch-status";
  watchedInput.value = "watched";
  watchedInput.dataset.watched = "watched";

  const unwatchedLabel = document.createElement("label");
  unwatchedLabel.textContent = "Unwatched";
  const unwatchedInput = document.createElement("input");
  unwatchedInput.type = "radio";
  unwatchedInput.id = "unwatched";
  unwatchedInput.name = "watch-status";
  unwatchedInput.value = "unwatched";
  unwatchedInput.dataset.watched = "unwatched";

  statusForm.append(
    allLabel,
    allInput,
    watchedLabel,
    watchedInput,
    unwatchedLabel,
    unwatchedInput,
  );
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
// Filtering and Sorting
// =================================================
// Group Filter Function
function updateMovies() {
  let allMovies = [...movies];

  allMovies = filterByStatus(allMovies);

  resultsCount.textContent = `${allMovies.length} movies`;

  renderCardList(allMovies);
}

// Status Filter Function
function filterByStatus(movies) {
  if (state.currentStatus === "all") return movies;

  return movies.filter((movie) => {
    if (state.currentStatus === "watched") {
      return movie.watched === true;
    }

    if (state.currentStatus === "unwatched") {
      return movie.watched === false;
    }
  });

  return movies;
}

// =================================================
// Event Listeners
// =================================================
statusForm.addEventListener("change", (e) => {
  state.currentStatus = e.target.dataset.watched;
  console.log(state.currentStatus);
  updateMovies();
});

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
  createWatchStatusForm();
  renderCardList(movies);
  resultsCount.textContent = `${movies.length} movies`;
}

init();
