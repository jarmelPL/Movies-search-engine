import * as main from "./main.js"

const searchPanel = document.querySelector('.search_panel')
const movieDiv = document.querySelector('.movies')
let movieDetailsObject;

export const prepareDetail = () => {
    main.theMovieDBInfo.style.display='block'
    searchPanel.style.display='none'
    startFetchDetail()
}

function startFetchDetail() {
    let movieID = (window.location.search).split('?movie=')[1]

    let URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${main.apiKEY}`

    fetch(URL)
    .then(response => response.json())
    .then(movie => {
        movieDetailsObject = {
                title: movie.title,
                image: movie.poster_path===null ? 'img/not-found.jpg' : 'https://image.tmdb.org/t/p/original'+movie.poster_path,
                genre: movie.genres.map(item => {
                    return " "+item['name']
                }),
                overview: movie.overview,
                release_date: movie.release_date,
                runtime: movie.runtime+" min",
                vote_average: movie.vote_average,
                vote_count: movie.vote_count
            }
        
        console.log(movieDetailsObject)
        })
    .then(createDetail)
    .catch(err => console.error(err));
}

function createDetail() {
    const movieDetailDiv = document.createElement('div')
    movieDiv.appendChild(movieDetailDiv)
    movieDetailDiv.classList.add('movie_detail')

    const posterElement = document.createElement('img')
    posterElement.setAttribute('src',movieDetailsObject.image)
    const infoContainerElement = document.createElement('div')
    
    movieDetailDiv.append(posterElement,infoContainerElement)
    posterElement.classList.add('poster-detail')
    infoContainerElement.classList.add('info-container-detail')

    infoContainerElement.append(createInfo(movieDetailsObject.title,'title'),createInfo(movieDetailsObject.release_date,'release-date'),createInfo(movieDetailsObject.genre,'genre'),createInfo(movieDetailsObject.overview,'overview'),createInfo(movieDetailsObject.runtime,'runtime'))
}

function createInfo(item,className) {
    const infoElement = document.createElement('div')
    infoElement.innerText=item
    infoElement.classList.add(className+"-detail")

    return infoElement
}