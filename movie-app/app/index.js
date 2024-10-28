
const input = document.querySelector('.input');
const resultWrapper = document.querySelector('.result-wrapper');
const lastPage = document.querySelector('.last-page')
const pageCurrent = document.querySelector('.page')
const nextPage = document.querySelector('.next-page')
const error = document.querySelector('.error');
const popup = document.querySelector('.popup');
const popupWrapper = document.querySelector('.popup-wrapper');
let page = 1;
let allPage = 1;
let searchInput = 'movie';



async function getData() {
    searchInput = input.value !== '' ? input.value : 'movie';
    let url = `https://www.omdbapi.com/?s=${searchInput}&page=${page}&apikey=ea430562`
    try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
        resultWrapper.innerHTML = '';
        pageCurrent.textContent = page;
        data.Search.map((v) => {
            renderCard(v);
        })
        allPage = Math.round(data.totalResults / 10);
    } else {
        error.style.display = 'flex'
    }
    } catch (error)  {
        console.log('Ошибка запроса:', error);
    }
}

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        page = 1;
        getData();
    }
})

function renderCard(dataImg) {
    const div = document.createElement("div");
    div.classList.add("card-wrapper");
    div.dataset.id = dataImg.imdbID;
    div.addEventListener('click', function() {
        renderingPopupInfo(dataImg.imdbID);
    })
    const img = document.createElement("img");
    img.classList.add("gallery-img");
    img.src = dataImg.Poster;
    img.alt = `image`;
    const divContent = document.createElement("div");
    divContent.classList.add("movie-information");
    const p = document.createElement("p");
    p.textContent = dataImg.Title;
    p.classList.add("card-title");
    const year = document.createElement("p");
    year.classList.add("card-year");
    year.textContent = dataImg.Year;
    div.append(img)
    div.append(divContent)
    divContent.append(p)
    divContent.append(year)
    resultWrapper.append(div);
}

nextPage.addEventListener('click', function () {
    if (page < allPage) {
        page++;
        getData();
    }
});

lastPage.addEventListener('click', function () {
    if (page > 1) {
        page--;
        getData();
    }
});

error.addEventListener('click', function() {
    error.style.display = 'none'
})

async function getStartPage() {
    let url = `https://www.omdbapi.com/?s=movie&page=${page}&apikey=ea430562`
    const res = await fetch(url);
    const data = await res.json();
    data.Search.map((v) => {
        renderCard(v);
    })
    allPage = Math.round(data.totalResults / 10);
}

getStartPage()

async function renderingPopupInfo(index) {
    let url = `https://www.omdbapi.com/?i=${index}&apikey=ea430562`
    const res = await fetch(url);
    const data = await res.json();
    const plot = document.createElement('p');
    plot.textContent = `Plot: ${data.Plot}`;
    plot.classList.add("popup-text");
    const actors = document.createElement('p');
    actors.textContent = `$Actors: ${data.Actors}`;
    actors.classList.add("popup-text");
    const writer = document.createElement('p');
    writer.textContent = `Writer: ${data.Writer}`;
    writer.classList.add("popup-text");
    const country = document.createElement('p');
    country.textContent = `Country: ${data.Country}`;
    country.classList.add("popup-text");
    const awards = document.createElement('p');
    awards.textContent = `Awards: ${data.Awards}`;
    awards.classList.add("popup-text");
    const runtime = document.createElement('p');
    runtime.textContent = `Runtime: ${data.Runtime}`;
    runtime.classList.add("popup-text");
    popup.style.display = 'flex'
    popupWrapper.append(plot);
    popupWrapper.append(actors);
    popupWrapper.append(writer);
    popupWrapper.append(country);
    popupWrapper.append(awards);
    popupWrapper.append(runtime);
}

popup.addEventListener('click', function () {
    popup.style.display = 'none';
    popupWrapper.innerHTML = '';
})