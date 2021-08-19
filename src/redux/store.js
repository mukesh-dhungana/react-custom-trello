import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducers } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {};

const rootReducer = combineReducers({
  ...reducers,
});

const middleware = [thunk].filter(Boolean);
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
store.subscribe((x) => {
  console.log(x);
});
