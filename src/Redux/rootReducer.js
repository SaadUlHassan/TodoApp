import { combineReducers } from "redux";
import TodoReducer from "./TodoReducer/TodoReducer";

const todoReducers = combineReducers({
  todo: TodoReducer,
});
export default todoReducers;
