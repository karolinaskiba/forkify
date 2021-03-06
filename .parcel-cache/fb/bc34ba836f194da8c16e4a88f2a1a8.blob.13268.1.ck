var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "state", function () {
  return state;
});
_parcelHelpers.export(exports, "loadRecipe", function () {
  return loadRecipe;
});
_parcelHelpers.export(exports, "loadSearchResults", function () {
  return loadSearchResults;
});
_parcelHelpers.export(exports, "getSearchResultPage", function () {
  return getSearchResultPage;
});
_parcelHelpers.export(exports, "updateServings", function () {
  return updateServings;
});
_parcelHelpers.export(exports, "addBookmark", function () {
  return addBookmark;
});
var _configJs = require('./config.js');
var _helperJs = require('./helper.js');
const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: _configJs.RES_PER_PAGE
  },
  bookmars: []
};
const loadRecipe = async function (id) {
  try {
    const resJson = await _helperJs.getJSON(`${_configJs.API_URL}/${id}`);
    const {recipe} = resJson.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (err) {
    throw err;
  }
};
const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await _helperJs.getJSON(`${_configJs.API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};
const getSearchResultPage = function (page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};
const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
const addBookmark = function (recipe) {
  state.bookmars.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
