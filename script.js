document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://jsonplaceholder.typicode.com/photos?_limit=10";
  const movieContainer = document.getElementById("movies");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort-movies");

  let movies = [];

  function fetchMovies(query = "") {
    fetch(`${API_URL}&title_like=${query}`)
      .then((response) => response.json())
      .then((data) => {
        movies = data;
        displayMovies(movies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }

  function displayMovies(movies) {
    movieContainer.innerHTML = "";
    movies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");
      movieDiv.innerHTML = `
          <img src="${movie.thumbnailUrl}" alt="${movie.title}">
          <div>
            <h3>${movie.title}</h3>
            <button class="like-btn">Like</button>
            <span class="likes">0</span>
          </div>
        `;
      movieContainer.appendChild(movieDiv);
    });
  }

  movieContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-btn")) {
      const likesSpan = event.target.nextElementSibling;
      likesSpan.textContent = parseInt(likesSpan.textContent) + 1;
    }
  });

  searchInput.addEventListener("input", () => {
    fetchMovies(searchInput.value);
  });

  sortSelect.addEventListener("change", () => {
    if (sortSelect.value === "title") {
      movies.sort((a, b) => a.title.localeCompare(b.title));
    }
    displayMovies(movies);
  });

  fetchMovies();
});
