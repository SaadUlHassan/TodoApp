import React from "react";
import "../../Style/style.css";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Redux/TodoActions/TodoActions";

const Todo = ({ index, todo }) => {
  const dispatch = useDispatch();
  const updateData = useSelector((state) => state.todo.updateData);
  return (
    <li
      id={index}
      className={todo.checked ? "list_item_1 list_active" : "list_item_1"}
    >
      <div className="flex">
        <span
          id={"check" + index}
          className={todo.checked ? "list_checked" : ""}
          onClick={() => {
            if (todo.status !== "Deleted") {
              dispatch(
                actions.updateCheckStatus({
                  id: todo.id,
                  status: todo.status === "Completed" ? "Active" : "Completed",
                })
              );
            }
          }}
        >
          <i className="fa fa-check"></i>
        </span>
        <strike
          id={"strike" + index}
          className={!todo.checked ? "strike_none" : "strike_show"}
        >
          {todo.text}
        </strike>
      </div>
      {todo.status !== "Deleted" && (
        <div className="flex">
          <button
            className="flex list-btn del-btn"
            onClick={() =>
              dispatch(
                actions.updateCheckStatus({ id: todo.id, status: "Deleted" })
              )
            }
          >
            <i className={`fa fa-trash`} style={{ fontSize: "150%" }}></i>
            <div className="p-5 hide-filter-name">Deleted</div>
          </button>
          <button
            disabled={!!updateData}
            className="flex list-btn p-5 edit-btn"
            onClick={() => {
              dispatch(actions.setUpdateData(todo));
            }}
          >
            <i className={`fa fa-edit`} style={{ fontSize: "150%" }}></i>
            <div className="p-5 hide-filter-name">Update</div>
          </button>
        </div>
      )}
    </li>
  );
};

export default Todo;
