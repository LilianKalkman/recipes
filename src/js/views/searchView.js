import {elements} from './elements';

export const getInput = () => {
  const input = elements.searchInput.value;
  return input;
};

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchList.innerHTML = '';
  document.querySelector('.results__pages').innerHTML = '';
};

export const highlightListItem = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(el => el.classList.remove('results__link--active'));

  document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

const limitRecipeTitle = (title, limit = 17) => {
  const newtitle = [];
  if(title.length > limit){
    title.split(' ').reduce((total, current) => {
      if(total + current.length <= limit) {
        newtitle.push(current);
      }
      return total + current.length;
    }, 0);
    return `${newtitle.join(' ')}...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const html = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
  `;
  elements.searchList.insertAdjacentHTML('beforeend', html);
};

const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
      <svg class="search__icon">
          <use href="../../../img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  </button>
`;


const renderPageButtons = (page, numResults, resPerPage ) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button = '';
  if(page === 1 && pages > 1){
    // button next
    button = createButton(page, 'next');
  } else if (page < pages & page !== 1) {
    // button next and prev
    button = `${createButton(page, 'prev')}${createButton(page, 'next')}`
  } else if(page === pages && pages > 1) {
    // button prev
    button = createButton(page, 'prev');
  }

  document.querySelector('.results__pages').insertAdjacentHTML('afterbegin', button);

}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results per page
  const start = (page - 1) * resPerPage;
  const end = start + resPerPage;
  recipes.slice(start,end).forEach(renderRecipe);
  // render pagination buttons
  renderPageButtons(page, recipes.length, resPerPage);
};
