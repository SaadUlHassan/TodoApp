import React from "react";
import TodoFilter from "./TodoFilter/TodoFilter";
import "../../Style/style.css";

const TodoFilters = () => (
  <div className="filters">
    <TodoFilter filter="All" icon={"list-ul"} />
    <TodoFilter filter="Active" icon={"times"} />
    <TodoFilter filter="Completed" icon={"check"} />
    <TodoFilter filter="Deleted" icon={"trash"} />
  </div>
);

export default TodoFilters;
