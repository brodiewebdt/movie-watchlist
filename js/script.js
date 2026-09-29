import { movies } from "../data.js";

// =================================================
// DOM References
// =================================================
const cardGrid = document.querySelector("#results");
const emptyState = document.querySelector("#empty-state");

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
// Initialization
// =================================================
function init() {
  renderCardList(movies);
}

init();
