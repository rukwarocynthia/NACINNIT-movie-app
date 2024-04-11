document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000";

  // Function to fetch all movies from the server
  const fetchAllMovies = async () => {
      try {
          const response = await fetch(`${baseURL}/movies`);
          if (!response.ok) {
              throw new Error("Failed to fetch movies");
          }
          return await response.json();
      } catch (error) {
          console.error("Error fetching movies:", error);
          throw error;
      }
  };

  // Function to display movie information
  const displayMovieInfo = (movie) => {
      const movieInfoContainer = document.getElementById("movie-info-container");
      movieInfoContainer.innerHTML = `
          <h2>${movie.title}</h2>
          <p><strong>Director:</strong> ${movie.director}</p>
          <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
          <p>${movie.description}</p>
          <img src="${movie.image}" alt="${movie.title}">
      `;
  };

  // Function to handle search button click
  const handleSearch = async () => {
      try {
          const searchInput = document.getElementById("search-input");
          const searchQuery = searchInput.value.trim().toLowerCase();

          // Fetch all movies
          const allMovies = await fetchAllMovies();

          // Find the matching movie
          const matchingMovie = allMovies.find(movie =>
              movie.title.toLowerCase() === searchQuery
          );

          // If matching movie is found, display its information
          if (matchingMovie) {
              displayMovieInfo(matchingMovie);
          } else {
              alert("Movie not found!");
          }
      } catch (error) {
          console.error("Error searching movies:", error);
      }
  };

  // Add event listener to the search button
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", handleSearch);
});
