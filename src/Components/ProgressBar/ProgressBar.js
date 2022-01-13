import React from "react";
import "../../Style/style.css";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const todos = useSelector((state) => state.todo.tasks);
  return (
    <ul className="progress-bar">
      {[...todos]
        .filter((item) => item.status !== "Deleted")
        .sort((a, b) => b.status.localeCompare(a.status))
        .map((_, index) => (
          <li
            key={index + 1}
            className={_.status === "Completed" ? "active" : ""}
          ></li>
        ))}
    </ul>
  );
};

export default ProgressBar;
