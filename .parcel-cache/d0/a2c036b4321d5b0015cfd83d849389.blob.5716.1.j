var _modelJs = require('./model.js');
var _viewsRecipeViewJs = require('./views/recipeView.js');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _viewsRecipeViewJsDefault = _parcelHelpers.interopDefault(_viewsRecipeViewJs);
var _viewsSearchViewJs = require('./views/searchView.js');
var _viewsSearchViewJsDefault = _parcelHelpers.interopDefault(_viewsSearchViewJs);
var _viewsResultsViewJs = require('./views/resultsView.js');
var _viewsResultsViewJsDefault = _parcelHelpers.interopDefault(_viewsResultsViewJs);
require('./views/paginationView.js');
require('core-js/stable');
require('regenerator-runtime/runtime');
if (module.hot) {
  module.hot.accept();
}
const controllRecipes = async function (url) {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    _viewsRecipeViewJsDefault.default.renderSpinner();
    // 1) Loading recipe
    await _modelJs.loadRecipe(id);
    const {recipe} = _modelJs.state.recipe;
    // 2) renderin Recipe
    _viewsRecipeViewJsDefault.default.render(_modelJs.state.recipe);
  } catch (err) {
    _viewsRecipeViewJsDefault.default.renderError();
  }
};
const controllSearchResult = async function () {
  try {
    _viewsResultsViewJsDefault.default.renderSpinner();
    const query = _viewsSearchViewJsDefault.default.getQuery();
    if (!query) return;
    await _modelJs.loadSearchResults(query);
    // resultsView.render(model.state.search.results);
    _viewsResultsViewJsDefault.default.render(_modelJs.getSearchResultPage());
  } catch (err) {
    _viewsRecipeViewJsDefault.default.renderError();
  }
};
const init = function () {
  _viewsRecipeViewJsDefault.default.addHandlerRender(controllRecipes);
  _viewsSearchViewJsDefault.default.addHandlerSearch(controllSearchResult);
};
// /////////////////////////////////////
init();
