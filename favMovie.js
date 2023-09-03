// Retrieve the list of favorite movie IDs from localStorage
let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
const movieList = document.getElementById('movieList');
// Check if there are any favorite movies
if (favoriteMovies && favoriteMovies.length > 0) {

    async function fetchAndDisplayMovieDetails(movieId) {
        // deleteList(movieId);
        const result = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=20d6343`);
        const details = await result.json();
        let movie = document.createElement('div');
        movie.style.width = '45%';
        movie.style.height = 'auto';
        movie.style.backgroundColor = 'black';
        movie.style.borderRadius = '10px';
        movie.style.marginLeft = '20px';
        movie.style.border = '2px solid darkgrey';
        movie.style.marginBottom = '5px';
        movie.innerHTML = `
        <div class = "movie-poster">
            <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster" style="height:120px;width:120px;margin-top:5px;margin-left:38%;  border-radius:50%;">
            <i class="fa-solid fa-trash fa-lg" style="color: #6698f0;margin-left:200px;margin-top:-1px; cursor:pointer;" data-movie-id=${movieId} ></i>
        </div>
        <div class = "movie-info">
            <h3 class = "movie-title bg-black" style="text-align:center">${details.Title}</h3>
            <ul class = "movie-misc-info" id="list-style">
                <li class = "year bg-black" style="text-align:center;">Actors: ${details.Actors}</li>
                <li class = "rated bg-black" style="text-align:center;">Ratings: ${details.imdbRating}</li>
                <li class = "released bg-black" style="text-align:center;">Released: ${details.Released}</li>
            </ul>
            </div>`;

        movieList.appendChild(movie);
        const deleteButton = movie.querySelector('.fa-trash');
        deleteButton.addEventListener('click', () => {
            // Remove the movie div from the page

            movie.remove();
            const getFavMovies=JSON.parse(localStorage.getItem('favoriteMovies'));
            // Remove the movie ID from localStorage

            let updatedFavoriteMovies = getFavMovies.filter(id => id !== movieId);
            console.log(updatedFavoriteMovies);
            localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavoriteMovies));
            favoriteMovies=updatedFavoriteMovies;
        });
    }
    favoriteMovies.forEach(movieId => {

        fetchAndDisplayMovieDetails(movieId);
    });
}
else {
    alert('Nothing to display in favorite section. Please add some movies!!!');
}