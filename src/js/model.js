import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmars: [],
};
export const loadRecipe = async function (id) {
  try {
    const resJson = await getJSON(`${API_URL}/${id}`);

    const { recipe } = resJson.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmars.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const getSearchResultPage = function (page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  state.bookmars.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persisitBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmars.find(el => (el.id = id));
  state.bookmars.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
const persisitBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmars));
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmars = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
clearBookmarks();
