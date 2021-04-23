import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// if (module.hot) {
//   module.hot.accept();
// }

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controllSearchResult = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage(1));
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};
const controllPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  //update recipe servings

  model.updateServings(newServings);
  //update recipe view
  recipeView.render(model.state.recipe);
};
const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  searchView.addHandlerSearch(controllSearchResult);
  paginationView.addHandlerClick(controllPagination);
  recipeView.addHandlerUpdareServings(controlServings);
};
///////////////////////////////////////

init();
