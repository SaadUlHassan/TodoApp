import React, { useEffect, useState } from "react";
import AddTodo from "../Components/AddTodo/AddTodo";
import TodoList from "../Components/TodoList/TodoList";
import Filters from "../Components/TodoFilters/TodoFilters";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import TodoHeader from "../Components/TodoHeader/TodoHeader";
import "../Style/style.css";
import WebAuthn from "../Components/WebAuthn";

const TodoApp = () => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setExpand(!expand);
    }, 2000);
  }, []);
  return (
    <>
    <WebAuthn/>
    <div className="container">
      <div className={expand ? "card heighten" : "card"}>
        <TodoHeader expand={expand} handleExpand={() => setExpand(!expand)} />
        <ProgressBar />
        <AddTodo />
        <Filters />
        <TodoList />
      </div>
    </div>
    </>
  );
};

export default TodoApp;
