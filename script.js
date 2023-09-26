
// Consts
// const apikey = "7543524441a260664a97044b8e2dc621";
const apikey = "923b0f8d5537d155f732743614ca66a1";
const apiEndpoint = "https://api.themoviedb.org/3"

const imgPath = "https://image.tmdb.org/t/p/original";




const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyC0SZJkHFX-fQ7NrsxdI4l4mGwYuY4l7P8`
}
// Functions

function init() {

    fetchtrendingmovies()
 
    fetchandBuildAllSections();
}

function fetchtrendingmovies(){
    fetchandBuildmoviesection(apiPaths.fetchTrending,'Trending')
    .then(list=>{
        const randomindex=parseInt(Math.random()*list.length)
        buildbannersection(list[randomindex])
       
    }).catch(err=>console.log(err))
    
}

function buildbannersection(movie){
    const bannersection = document.getElementById("banner-section")

    bannersection.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}')`

    const div = document.createElement('div')
    div.classList.add('banner')

    div.innerHTML=`
   
 
    <h1 class="movietitle">${movie.original_title}</h1>
 
    <h4 class="overviewheading">Tending Now | Released ${movie.release_date}</h4>
    <p class="banner-content">${movie.overview && movie.overview.length > 200 ? movie.overview.slice(0,200).trim()+ '...':movie.overview}</p>

<div class="actions">
    <button class="play">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
        Play</button>
    <button class="moreinfo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>More Info</button>
</div>
    `

    bannersection.appendChild(div)
}

function fetchandBuildAllSections() {
    fetch(apiPaths.fetchAllCategories)
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            const categories = res.genres
            if (Array.isArray(categories) && categories.length) {

                categories.forEach(category => {
                    fetchandBuildmoviesection(apiPaths.fetchMoviesList(categories.id),category.name)    //categories.id categories section se id laa rhi hai jo fetch movie list me pass ki jaegi
                    })

            }
         }).catch((err) => console.log(err))
    }
function fetchandBuildmoviesection(fetchUrl, categoryname) {

    console.log(fetchUrl, categoryname)

    
     return fetch(fetchUrl)
        .then(res => res.json())
        .then(res => {
            const movies = res.results

            // console.log(movies)
            if (Array.isArray(movies) && movies.length) {
                buildmoviessection(movies, categoryname)
            }
            return movies

        })
        .catch(err => console.log(err))


}

function buildmoviessection(list,categoryname ) {
    console.log(list, categoryname)

    const moviescontainer = document.querySelector(".movies-container")

    const moviessectionimages = list.map(item => {
        return `<div>
        <img src="${imgPath}${item.poster_path}" alt="${item.title}">
        
    //     <div>
    //     <h3>${item.title}</h3>
    //     <p><span>Rating: 4/5</span></p>
    //     </div>
    //   </div>
        `
}).join('')



    const moviessectionHTML = `
    <div class="movies-section">
     <h2 class="trending">${categoryname}</h2>
     <div class="imagesection">
     ${moviessectionimages}
     
     </div>
     </div>
     `

    const div = document.createElement("div")
    div.classList.add("movies-section")
    div.innerHTML = moviessectionHTML
 moviescontainer.appendChild(div)



}


window.addEventListener('load', () => {
    init();
const headernav=document.getElementById('headernav')
    window.addEventListener('scroll',()=>{
if(window.scrollY>30){headernav.classList.add("bg-grey")}
else{headernav.classList.remove('bg-grey')}
    })

   
})


