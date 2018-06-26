import Search from './models/Search';
import * as searchView from './views/searchView';

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
    
    // search for recipes
    await state.search.getResults();
    console.log(state.search.result);
    searchView.renderResults(state.search.result);
    // show results on UI
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
})

// const search1 = new Search('salmon');
// console.log(search1);
//
// search1.getResults();
