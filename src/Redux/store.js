import { createStore } from "redux";
import todoReducers from "./rootReducer";

const Store = createStore(todoReducers);

export default Store;
