// Initial References
let movieNameRef = document.getElementById("movie-name");
let result = document.getElementById("result");
let watchlist = [];

// Function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value.trim(); // Trim whitespace from movie name
    let apiKey = "dad04ef6";
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    // If input field is empty
    if (movieName.length === 0) {
        result.innerHTML = '<h3 class="msg">Please Enter A Movie Name</h3>';
    }
    // If input field is NOT empty
    else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // If movie exists in database
                if (data.Response === "True") {
                    result.innerHTML = `
                        <div class="info">
                            <img src="${data.Poster}" class="poster">
                            <div>
                                <h2 data-id="${data.imdbID}">${data.Title}</h2>
                                <div class="rating">
                                    <img src="star-icon.svg">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    `;
                }
                // If movie does NOT exist in database
                else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            // If error occurs
            .catch((error) => {
                console.error("Error fetching data:", error);
                result.innerHTML = '<h3 class="msg">Error Occurred</h3>';
            });
    }
};
//Function to handle download button
// Make a request to the API endpoint
fetch("https://api.example.com/download-link")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // Extract the download URL from the response data
        const downloadUrl = data.downloadUrl;

        // Use the URL to initiate the download process
        window.open(downloadUrl, "_blank");
    })
    .catch(error => {
        console.error("Error fetching download link:", error);
    });

// Function to display a box for writing a review
const handleWriteReview = () => {
    const reviewTextarea = document.createElement("textarea");
    reviewTextarea.placeholder = "Write your review here...";
    result.appendChild(reviewTextarea);
};

// Function to add movie to watchlist
const handleAddToWatchlist = () => {
    const movieTitle = result.querySelector("h2").textContent;
    const moviePoster = result.querySelector(".poster").src;
    const movieId = result.querySelector("h2").getAttribute("data-id");

    const isDuplicate = watchlist.some(movie => movie.id === movieId);

    if (!isDuplicate) {
        const movieData = {
            title: movieTitle,
            poster: moviePoster,
            id: movieId
        };
        watchlist.push(movieData);
        console.log("Movie added to watchlist:", movieData);
        //Display confirm message
        const message = document.createElement("p");
        message.textContent = 'Succesfully added to watchlist';
        message.style.color = "green";
        result.appendChild(message);
    } else {
        console.log("Movie is already in the watchlist");
    }
};

// Function to delete movie from watchlist
const handleDeleteFromWatchlist = () => {
    const movieId = result.querySelector("h2").getAttribute("data-id");
    const index = watchlist.findIndex(movie => movie.id === movieId);

    if (index !== -1) {
        const deletedMovie = watchlist.splice(index, 1)[0];
        console.log("Movie deleted from watchlist:", deletedMovie);
    } else {
        console.log("Movie not found in watchlist");
        const message = document.createElement("p");
        message.textContent = 'Movie has been deleted from watchlist';
        message.style.color = "red";
        result.appendChild(message);
    }
};

// Function to display a box for writing a comment
const handleWriteComment = () => {
    const commentTextarea = document.createElement("textarea");
    commentTextarea.placeholder = "Write your comment here...";
    result.appendChild(commentTextarea);
};

// Event listeners for buttons
document.getElementById("search-btn").addEventListener("click", getMovie);
document.getElementById("write-review-btn").addEventListener("click", handleWriteReview);
document.getElementById("write-comment-btn").addEventListener("click", handleWriteComment);
document.getElementById("add-to-watchlist-btn").addEventListener("click", handleAddToWatchlist);
document.getElementById("delete-from-watchlist-btn").addEventListener("click", handleDeleteFromWatchlist);

