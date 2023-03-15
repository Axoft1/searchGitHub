const formSearch = document.querySelector(".search__form");
const inputSearch = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const searchArticle = document.querySelector(".search__article");


/**
 * Создает html разметку с введенными данными и добавляет в DOM
 * @param {*} data данные с fetch запроса
 */
function createCards(data) {
    searchArticle.innerHTML = ""

  if(!data || data.length == 0){
    return searchArticle.innerHTML = 'Ничего не найдено'
  }
    return data.forEach((e) => {
         searchArticle.innerHTML += `
         <div class="search__data">
          <a href="${e.html_url}" target="_blank">${e.name}</a>
          <img src="${e.owner.avatar_url}"/>
          <p>${e.description}</p>
         </div>
         `;
    });
}

/**
 * Создает frtch запрос к сайту
 * @returns вызывает функцию createCards и передает data или возвращает ошибку
 */
formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  let input = Object.fromEntries(new FormData(e.target));

  try {
    fetch(`https://api.github.com/search/repositories?q=${input.name}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {       
          createCards(data.items);        
      });
  } catch (error) {
    console.error("Ошибка:", error);
  }
});
