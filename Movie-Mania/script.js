// Titles: https://www.omdbapi.com/?s=thor&page=1&apikey=8f2d6708
// details: http://www.omdbapi.com/?i=tt3896198&apikey=8f2d6708

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search__list');
const resultGrid = document.getElementById('result__grid');

// load movies from API //
async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=8f2d6708`
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //console.log(data.Search)
    if(data.Response == "True") displayMoviesList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else{
        searchList.classList.add('hide-search-list');
    }
}

function displayMoviesList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let moviesListItem = document.createElement('div');
        moviesListItem.dataset.id = movies[idx].imdbID;
        moviesListItem.classList.add('search__list--item');
        if(movies[idx].Poster != "N/A")
        moviePoster = movies[idx].Poster
            else
                moviePoster = "image_not_found.png";

                moviesListItem.innerHTML = `
                <div class="search__item--thumbnail">
                <img src= "${moviePoster}"> 
                </div>
                <div class="search__item--info">
                <h3>${movies[idx].Title}</h3>
                <p>${movies[idx].Year}</p>
                </div>
                `;
                searchList.appendChild(moviesListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search__list--item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
           // console.log(movie.dataset.id);
           searchList.classList.add('hide-search-list');
           movieSearchBox.value = "";
           const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=8f2d6708`);
           const movieDetails = await result.json();
           //console.log(movieDetails)
           displayMoviesDetails(movieDetails);
        });
    });
}

function displayMoviesDetails(details){
    resultGrid.innerHTML = `
        <div class="movie__poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="">
        </div>
        <div class="movie__info">
        <h3 class="movie__title">${details.Title}</h3>
        <ul class = "movie__misc--info">
        <li class = "year">Year: ${details.Year}</li>
        <li class = "rated">Ratings: ${details.Rated}</li>
        <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b> ${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class="fa-solid fa-award"></i></b> ${details.Awards}</p>
        </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});