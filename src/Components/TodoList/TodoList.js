import React from "react";
import Todo from "../TodoCard/TodoCard";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.tasks);
  const todoFilter = useSelector((state) => state.todo.todoFilter);

  return (
    <div className="todo-list-wrapper">
      {todos
        .filter((item) =>
          todoFilter === "All"
            ? item.status !== "Deleted" ?? item
            : todoFilter === item.status
        )
        .map((todo, index) => (
          <Todo key={todo.id} index={index + 1} todo={todo} />
        ))}
    </div>
  );
};

export default TodoList;
