import { createStore, combineReducers } from "redux";
import { favreducer } from "./Reducers/Fav";
const combined = combineReducers({
  favlist: favreducer
});
export const store = createStore(combined);
