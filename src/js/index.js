import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/elements';

/*
  State hier is normaal je store in redux; simpel gebruik van state, wat je anders managed met react en redux

  Global state of app;
  -search object
  -current recipe object
  -shopping list object
  -liked recipes
*/

const state = {};

const controlSearch = async () => {
  // get query from input
  const query = searchView.getInput();
  console.log(query);

  if(query){
    // set state to search query
    state.search = new Search(query);

    // prep UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.resultsDiv);

    // search for recipes
    await state.search.getResults();
    console.log(state.search.result);

    // show results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
}


const r = new Recipe(48364);
const recipe = r.getRecipe();
console.log(recipe);


document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
})

document.querySelector('.results__pages').addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn){
    const nextPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, nextPage)
  }
})
