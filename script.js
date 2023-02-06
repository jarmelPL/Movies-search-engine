const titleInput = document.querySelector('.title')
const btn = document.querySelector('.start')
const apiKEY = '680664962b614346e4f587e2fdbff113'
let titleValue;
let moviesInfo=[];

function startApp() {
    titleValue=titleInput.value

    let URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&language=en-US&query=${titleValue}&page=1&include_adult=true`

    fetch(URL)
        .then(response => response.json())
        .then(response => response.results)
        // .then(results => console.log(results))
        .then(results => {
            moviesInfo = results.map(movie => {
                return {
                    title: movie.title,
                    image: 'https://image.tmdb.org/t/p/original'+movie.poster_path,
                    id: movie.id,
                    note: movie.vote_average,
                    date: movie.release_date
                }
            })
            console.log(moviesInfo)
        })
        .catch(err => console.error(err));
    }

btn.addEventListener('click',startApp)

