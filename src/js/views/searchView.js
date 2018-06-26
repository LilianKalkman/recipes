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

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
