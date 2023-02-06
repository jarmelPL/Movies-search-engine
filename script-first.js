const apiKEY = '680664962b614346e4f587e2fdbff113'
const URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&language=en-US&query=lord&page=1&include_adult=true`
let movieID
let movieIDS = [];
let movieInfo={};
let moviesInfo=[];


fetch(URL)
    .then(response => response.json())
    .then(response => response.results)
    .then(elements => {
        elements.map(item => movieIDS.push(item.id))
        nextstep(movieIDS)
        })
    .then(console.log(moviesInfo))
    .catch(err => console.error(err));


function nextstep() {
    movieIDS.forEach(movie => {
        fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${apiKEY}&language=en-US`)
            .then(response => response.json())
            .then(response => console.log(response))
            .then(response => movieInfo = {
                title: response.title,
                image: response.poster_path
            })
            .then(response => moviesInfo.push(movieInfo))
            .catch(err => console.error(err));
    }) 
}
