import { prepareDetail } from "./detail.js";

const titleInput = document.querySelector('.title')
const searchBtn = document.querySelector('.start')
const returnBtn = document.querySelector('.return')
const moviesUl = document.querySelector('.movies_list')
const previousPageBtn = document.querySelector('.page-previous')
const nextPageBtn = document.querySelector('.page-next')
const currentPageSpan = document.querySelector('.page-current')
const allPagesSpan = document.querySelector('.page-all')
const pagesScroller = document.querySelector('.pages_scroller')
const theMovieDBInfo = document.querySelector('.themoviedb_info')
const apiKEY = '680664962b614346e4f587e2fdbff113'
let titleValue;
let results=[];
let moviesInfo={};
let page=1

if (window.location.search.includes("?movie=")) {
    prepareDetail()
} else { startApp() }

function startApp() {
    if (titleInput.value!='') {
        titleValue=titleInput.value

        let URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&language=en-US&query=${titleValue}&page=${page}`

        fetch(URL)
            .then(response => response.json())
            .then(response => {
                results = response.results.map(movie => {
                    return {
                        title: movie.title,
                        image: movie.poster_path===null ? 'img/not-found.jpg' : 'https://image.tmdb.org/t/p/original'+movie.poster_path,
                        id: movie.id,
                        date: movie.release_date || 'Lack of data' 
                    }
                })
                moviesInfo= {
                    movies: results,
                    total_pages: response.total_pages
                }
                console.log(moviesInfo)
            })
            .then(addMovies)
            .then(addPagesScroller)
            .catch(err => console.error(err));
    } else { 
        titleInput.setAttribute('placeholder','Enter the title')
    }
}

function addMovies() {
    document.querySelector('body').style.height='auto'
    moviesUl.textContent=''
    results.forEach(item => {
        moviesUl.appendChild(createLi(item))
    })
    theMovieDBInfo.style.display='block'
    returnBtn.style.display='block'
}

function createLi(item) {
    const liElement = document.createElement("li");

    const anchorElement = document.createElement('a')
    anchorElement.href=`?movie=${item.id}`
    anchorElement.setAttribute('target','_blank')

    const posterContainerElement = document.createElement('div')
    const posterElement = document.createElement('img')
    posterElement.setAttribute('src',item.image)
    posterContainerElement.appendChild(posterElement)
    posterContainerElement.classList.add('poster-container')
    posterElement.classList.add('poster')

    const infoContainerElement = document.createElement('div')
    const infoTitle = document.createElement('div')
    infoTitle.innerText=item.title
    const infoDate = document.createElement('div')
    infoDate.innerText=item.date

    infoContainerElement.append(infoTitle,infoDate)
    infoContainerElement.classList.add('info-container')
    infoTitle.classList.add('info-title')
    infoDate.classList.add('info-date')

    anchorElement.append(posterContainerElement, infoContainerElement)

    liElement.appendChild(anchorElement)

    return liElement
}

function addPagesScroller() {
    if (moviesInfo.total_pages===1 || page===moviesInfo.total_pages) {
        nextPageBtn.setAttribute('disabled','')
    } else {
        nextPageBtn.removeAttribute('disabled')
    }
    pagesScroller.style.display='flex'
    currentPageSpan.innerText=page
    allPagesSpan.innerText=moviesInfo.total_pages
}



searchBtn.addEventListener('click',()=> {
    page=1
    startApp()
})
titleInput.addEventListener('keydown', e => {
    if (e.key=="Enter") {
        page=1
        startApp()
    }
})

previousPageBtn.addEventListener('click',()=>{
    page--
    if (page===1) {previousPageBtn.setAttribute('disabled','')}
    startApp()
})

nextPageBtn.addEventListener('click',()=>{
    page++
    previousPageBtn.removeAttribute('disabled')
    startApp()
})

returnBtn.addEventListener('click',()=>{
    window.location.href='./'
})

export { theMovieDBInfo, pagesScroller, apiKEY }