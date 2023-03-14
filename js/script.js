const formSearch = document.querySelector(".search__form");
const inputSearch = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const searchArticle = document.querySelector(".search__article");

inputSearch.addEventListener("input", function (event) {
    console.log(inputSearch.validity.typeMismatch);
    var st = new RegExp("[^a-zA-Z0-9]+");
    if (/^([a-zA-Z]*)$/.test(event)) {
      console.log("sd");
    }
      if (inputSearch.validity.typeMismatch) {
        inputSearch.setCustomValidity("I am expecting an e-mail address!");
      } else {
        inputSearch.setCustomValidity("");
      }
});

function createCards(data) {
    searchArticle.innerHTML = ""
     console.log(data);
  if(!data || data.length == 0){
    return searchArticle.innerHTML = 'Ничего не найдено'
  }
    return data.forEach((e, i) => {
      console.log(i);
         searchArticle.innerHTML += `<div class="search__data">
         <a href="${e.html_url}" target="_blank">${e.name}</a>
         <img src="${e.owner.avatar_url}"/>
         <p>${e.description}</p>
         </div>
         `;
    });
}

formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  let input = Object.fromEntries(new FormData(e.target));
  try {
    fetch(`https://api.github.com/search/repositories?q=${input.name}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {       
          // console.log(createCards(data.items));
          createCards(data.items);        
      });
  } catch (error) {
    console.error("Ошибка:", error);
  }
  // console.log(request);
  // let data = await request.json
});
