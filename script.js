const titleInput = document.querySelector('.title')
const btn = document.querySelector('.start')
const moviesDiv = document.querySelector('.movies_list')
const apiKEY = '680664962b614346e4f587e2fdbff113'
let titleValue;
let results=[];
let moviesInfo={};
let page=1

function startApp() {
    titleValue=titleInput.value

    let URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&language=en-US&query=${titleValue}&page=${page}&include_adult=true`

    fetch(URL)
        .then(response => response.json())
        // .then(results => console.log(results))
        .then(response => {
            results = response.results.map(movie => {
                return {
                    title: movie.title,
                    image: 'https://image.tmdb.org/t/p/original'+movie.poster_path,
                    id: movie.id,
                    note: movie.vote_average,
                    date: movie.release_date
                }
            })
            moviesInfo= {
                page: response.page,
                movies: results,
                total_pages: response.total_pages
            }
            console.log(moviesInfo)
        })
        .catch(err => console.error(err));

    addMovies(moviesInfo)
}

function addMovies(moviesInfo) {
    const newUlList= document.createElement('ul')
    moviesDiv.appendChild(newUlList)

    newUlList.append(addMoviesToUl(moviesInfo))
}

function addMoviesToUl(moviesInfo) {
    return results.map(item => {
        const newLi = document.createElement('li')
        newLi.textContent=item.title
    })
}

btn.addEventListener('click',startApp)

