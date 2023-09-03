
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const favList=document.getElementById('favList');
const favItems=document.getElementById('fav-items');
favList.addEventListener('click',function(){
    window.location.href='favMovie.html';
})
favItems.addEventListener('click',function(){
    window.location.href='favMovie.html';
})

// Check if the movie list is already in localStorage; if not, initialize it as an empty array
if (!localStorage.getItem('favoriteMovies')) {
    localStorage.setItem('favoriteMovies', JSON.stringify([]));
}
// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&apikey=20d6343`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "imagenotfound.jpg";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
            <span><i class="fa-solid fa-star" style="color: #dadbdc;" data-movie-id="${movies[idx].imdbID}"></i></span>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();

     // Add a click event listener to the <i> tags
     const favoriteIcons = searchList.querySelectorAll('.fa-star');
     favoriteIcons.forEach(icon => {
         icon.addEventListener('click', (event) => {
             event.stopPropagation(); // Prevent the click event from propagating to the parent div
             const movieId = event.target.getAttribute('data-movie-id');
             // Retrieve the existing movie list from localStorage
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));

        // Add the selected movieId to the list
        favoriteMovies.push(movieId);

        // Save the updated list back to localStorage
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
             alert('Added to MyFavList section!!!');
     
             // Handle the click on the <i> tag here
             // You can add your favorite movie logic here
            //  console.log(`Favorite icon clicked for movie ID: ${movieId}`);
         });
     });
 }

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
          
            console.log('Flow moved ahead.')
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const movieId=movie.dataset.id;
            window.location.href = `movie.html?id=${movieId}`;
        });
    });
}

function displayMovieDetails(details){
  
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
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


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});