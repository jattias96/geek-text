import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import { getBooksReducer, getBookDetailsReducer } from "./reducers/bookReducers";
import { getAuthorDetailsReducer } from "./reducers/authorReducers";

const reducer = combineReducers({
  cart: cartReducer,
  getBooks: getBooksReducer,
  getBookDetails: getBookDetailsReducer,
  getBooksByAuthor: getAuthorDetailsReducer,
});

const middleware = [thunk];

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;