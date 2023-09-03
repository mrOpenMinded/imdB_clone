window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        fetchMovieDetails(movieId);
    }
});

async function fetchMovieDetails(movieId) {
    const result = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=20d6343`);
    const movieDetails = await result.json();

    displayMovieDetails(movieDetails);
}

function displayMovieDetails(details) {
    const movieDetailsContainer = document.getElementById('result-grid');
    // <!-- Your movie details HTML here, similar to what you had before -->
     // resultGrid.innerHTML = `
    // Check if the container exists before updating it
    if (movieDetailsContainer) {
        movieDetailsContainer.innerHTML = `
            <div class = "movie-poster">
                <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
            </div>
            <div class = "movie-info">
                <h3 class = "movie-title">${details.Title}</h3>
                <ul class = "movie-misc-info">
                    <li class = "year">Year: ${details.Year}</li>
                    <li class = "rated">Ratings: ${details.imdbRating}</li>
                    <li class = "released">Released: ${details.Released}</li>
                </ul>
                <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
                <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
                <p class = "actors"><b>Actors: </b>${details.Actors}</p>
                <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
                <p class = "language"><b>Language:</b> ${details.Language}</p>
                <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
            </div>
            `;  
    }
}
