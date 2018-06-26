import {elements} from './elements';

export const getInput = () => {
  const input = elements.searchInput.value;
  return input;
}

export const clearInput = () => {
  elements.searchInput.value = '';
}

const renderRecipe = recipe => {
  const html = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
  `;
  elements.searchList.insertAdjacentHTML('beforeend', html);
}

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
}
