const titleInput = document.querySelector('.title')
const btn = document.querySelector('.start')
const returnBtn = document.querySelector('.return')
const moviesUl = document.querySelector('.movies_list')
const previousPageBtn = document.querySelector('.page-previous')
const nextPageBtn = document.querySelector('.page-next')
const currentPageSpan = document.querySelector('.page-current')
const allPagesSpan = document.querySelector('.page-all')
const pagesScroller = document.querySelector('.pages_scroller')
const apiKEY = '680664962b614346e4f587e2fdbff113'
let titleValue;
let results=[];
let moviesInfo={};
let page=1

if (window.location.search.includes("?movie=")) {
    console.log('lol')
} else { startApp() }

function startApp() {
    titleValue=titleInput.value

    let URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&language=en-US&query=${titleValue}&page=${page}&include_adult=false`

    fetch(URL)
        .then(response => response.json())
        // .then(results => console.log(results))
        .then(response => {
            results = response.results.map(movie => {
                return {
                    title: movie.title,
                    image: movie.poster_path===null ? 'img/not-found.jpg' : 'https://image.tmdb.org/t/p/original'+movie.poster_path,
                    id: movie.id,
                    rate: movie.vote_average,
                    rate_count: movie.vote_count,
                    date: movie.release_date
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
}

function addMovies() {
    document.querySelector('body').style.height='auto'
    moviesUl.textContent=''
    results.forEach(item => {
        moviesUl.appendChild(createLi(item))
    })
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

    const infoRate = document.createElement('div')
    const rate = document.createElement('span')
    rate.innerText = item.rate
    const count = document.createElement('span')
    count.innerText = item.rate_count
    infoRate.append(rate,' / ',count)

    infoContainerElement.append(infoTitle,infoDate,infoRate)
    infoContainerElement.classList.add('info-container')
    infoTitle.classList.add('info-title')
    infoDate.classList.add('info-date')
    infoRate.classList.add('info-rate')
    rate.classList.add('rate')
    count.classList.add('count')

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



btn.addEventListener('click',()=> {
    page=1
    startApp()
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
    // window.location.href='?search='+(window.location.search).split('&search=')[1]
    window.location.href='./'
})