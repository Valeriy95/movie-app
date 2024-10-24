
const input = document.querySelector('.input');
const resultWrapper = document.querySelector('.result-wrapper');
const lastPage = document.querySelector('.last-page')
const pageCurrent = document.querySelector('.page')
const nextPage = document.querySelector('.next-page')
let page = 1;
let allPage = 1;



async function getData() {
    let url = `https://www.omdbapi.com/?s=${input.value}&page=${page}&apikey=ea430562`
    const res = await fetch(url);
    const data = await res.json();
    resultWrapper.innerHTML = '';
    pageCurrent.textContent = page;
    console.log(data)
    data.Search.map((v) => {
        renderCard(v);
    })
    allPage = Math.round(data.totalResults / 10);
}

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        page = 1;
        getData();
    }
})

function renderCard(dataImg) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.classList.add("gallery-img");
    img.src = dataImg.Poster;
    img.alt = `image`;
    const divContent = document.createElement("div");
    divContent.classList.add("movie-information");
    const p = document.createElement("p");
    p.textContent = dataImg.Title;
    const year = document.createElement("p");
    year.textContent = dataImg.Year;
    div.append(img)
    div.append(divContent)
    divContent.append(p)
    divContent.append(year)
    resultWrapper.append(div);
}

nextPage.addEventListener('click', function () {
    if (page < allPage) {
        console.log('YEEEESSS')
        page++;
        getData();
    }
});

lastPage.addEventListener('click', function () {
    if (page > 1) {
        console.log('dddddd')
        page--;
        getData();
    }
})