import React from "react";
import { useSelector } from "react-redux";
import "../../Style/style.css";

const TodoHeader = ({ expand, handleExpand }) => {
  const todos = useSelector((state) => state.todo.tasks);
  return (
    <div className="top">
      <h3>TODO LIST</h3>
      <div className="checked_tick" onClick={handleExpand}>
        {" "}
        <i
          id="checked_toggle"
          className={
            todos.filter((item) => item.status === "Completed").length ===
            todos.filter((item) => item.status !== "Deleted").length
              ? "fa fa-check"
              : "fa fa-check d-none"
          }
        ></i>{" "}
        <span>
          <i className={expand ? "fa fa-angle-up" : "fa fa-angle-down"}></i>
        </span>{" "}
      </div>
    </div>
  );
};

export default TodoHeader;
