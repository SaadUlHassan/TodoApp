import React from "react";
import todoReducers from "../../../Redux/rootReducer";

const stateBefore = {
  todo: {
    tasks: [],
    todoFilter: "All",
    updateData: null,
  },
};
const action = {
  type: "TODO/ADD",
  payload: {
    id: 0,
    text: "QuantData Task",
    checked: false,
    status: "Active",
  },
};
const stateAfter = {
  todo: {
    tasks: [
      {
        id: 0,
        text: "QuantData Task",
        checked: false,
        status: "Active",
      },
    ],
    todoFilter: "All",
    updateData: null,
  },
};
test("should return the updated state after adding a todo", () => {
  expect(todoReducers(stateBefore, action)).toEqual(stateAfter);
});
test("addTodo should not mutate the existing todo array", () => {
  expect(todoReducers(stateBefore, action)).not.toBe(stateBefore);
});
