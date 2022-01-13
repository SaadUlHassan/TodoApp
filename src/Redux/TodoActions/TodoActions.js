export const TodoActionTypes = {
  addTodo: "TODO/ADD",
  updateTodoList: "TODO/UPDATE",
  filterTodo: "TODO/FILTER_TODO",
  updateCheckStatus: "TODO/UPDATE_CHECK_STATUS",
  setUpdateData: "TODO/SET_UPDATE_DATA",
};
const TodoActions = {
  addTodo: (data) => {
    return {
      type: TodoActionTypes.addTodo,
      payload: data,
    };
  },
  updateTodoList: (data) => {
    return {
      type: TodoActionTypes.updateTodoList,
      payload: data,
    };
  },
  filterTodoList: (filter) => {
    return {
      type: TodoActionTypes.filterTodo,
      payload: filter,
    };
  },
  updateCheckStatus: (data) => {
    return {
      type: TodoActionTypes.updateCheckStatus,
      payload: data,
    };
  },
  setUpdateData: (data) => {
    return {
      type: TodoActionTypes.setUpdateData,
      payload: data,
    };
  },
};

export default TodoActions;
