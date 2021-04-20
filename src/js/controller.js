import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const controllRecipes = async function (url) {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //1) Loading recipe

    await model.loadRecipe(id);
    const { recipe } = model.state.recipe;

    //2) renderin Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

//['load','hashchange'].forach(ev => window.addEventListener(ev, controllRecipes))
const init = function () {
  recipeView.addHandlerRender(controllRecipes);
};
///////////////////////////////////////

init();
