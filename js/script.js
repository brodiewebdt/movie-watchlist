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
  renderCardList(movies);
}

init();
