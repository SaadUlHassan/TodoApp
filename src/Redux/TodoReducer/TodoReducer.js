import { TodoActionTypes } from "../TodoActions/TodoActions";

const defaultState = {
  tasks: [],
  todoFilter: "All",
  updateData: null,
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TodoActionTypes.addTodo:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case TodoActionTypes.updateTodoList:
      return {
        ...state,
        tasks: [...state.tasks].map((obj) =>
          action.payload.id === obj.id ? action.payload : obj
        ),
        updateData: null,
      };
    case TodoActionTypes.filterTodo: {
      return {
        ...state,
        todoFilter: action.payload,
      };
    }
    case TodoActionTypes.updateCheckStatus: {
      return {
        ...state,
        tasks: state.tasks?.map((task) => {
          if (task.id !== action.payload.id) {
            return task;
          }
          return {
            ...task,
            checked:
              action.payload.status !== "Deleted"
                ? !task.checked
                : task.checked,
            status: action.payload.status,
          };
        }),
      };
    }
    case TodoActionTypes.setUpdateData:
      return {
        ...state,
        updateData: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
