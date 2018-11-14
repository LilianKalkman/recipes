import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/elements';

const recipeHTML = document.querySelector('.recipe');
const shoppingHTML = document.querySelector('.shopping');

/*
  State hier is normaal je store in redux; simpel gebruik van state, wat je anders managed met react en redux

  Global state of app;
  -search object
  -current recipe object
  -shopping list object
  -liked recipes
*/

const state = {};
window.state = state;

state.likes = new Likes();

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


// const r = new Recipe(48364);
// r.getRecipe();


document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

document.querySelector('.results__pages').addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  console.log(btn);
  if(btn){
    const nextPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.result, nextPage)
  }
});


const controlRecipe = async () => {
  const id = location.hash.replace('#', '');

  if(id){
    searchView.highlightListItem(id);
    recipeView.clearRecipe();
    renderLoader(recipeHTML);

    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();

      state.recipe.calcTime();
      state.recipe.calcServings();
      state.recipe.parseIngredients();
      console.log(state.recipe);

      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch(error){
      console.log(error);
    }

  }
};

// list "controller"
const controlList = () => {
  if(!state.list){
    state.list = new List();
  }

  state.recipe.ingredients.forEach( el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  })

};



addEventListener('hashchange', controlRecipe);
addEventListener('load', controlRecipe);

recipeHTML.addEventListener('click', e => {
  if(e.target.matches('.btn-decrease, .btn-decrease *')){
    if(state.recipe.servings > 1){
      state.recipe.updateServings('-');
      recipeView.updateRecipe(state.recipe);
    };
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('+');
    recipeView.updateRecipe(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')){
    controlLike();
  }
});

shoppingHTML.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  if (e.target.matches('.shopping__delete, .shopping__delete *')){
    state.list.deleteItem(id);
    listView.deleteListItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    state.list.updateCount(id, parseFloat(e.target.value));
  };
});


// Like controller

/*
  1. pak like knop, event listener
  2. op basis daarvan pak je het id van het recept waar je op zit en maak je een new Like aan.
  3. render je likes(list) op je screen (display none, alleen bij hover over hartje zichtbaar)
  4. toggle CSS class voor liked of niet
  5. handle delete like knop
*/


const controlLike = () => {
  const id = state.recipe.id;
  if(!state.likes) {
    state.likes = new Likes();
  }

  if(!state.likes.isLiked(id)){
    const newLike = state.likes.addLike(id, state.recipe.title, state.recipe.author, state.recipe.img)
    likesView.toggleHeart(true);
    likesView.addLikeHTML(newLike);
  } else {
    state.likes.deleteLike(id);
    likesView.deleteLikeHTML(id);
    likesView.toggleHeart(false);
  }

  console.log(state.likes);

}
