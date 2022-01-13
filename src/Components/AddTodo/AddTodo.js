import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Redux/TodoActions/TodoActions";
import "../../Style/style.css";

const AddTodo = () => {
  const updateData = useSelector((state) => state.todo.updateData);
  const [item, setItem] = useState(!!updateData ? updateData.text : "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateData) {
      setItem(updateData.text);
    }
  }, [updateData]);
  return (
    <div className="add-todo">
      <input
        type="text"
        className="add-todo__input"
        onChange={(e) => setItem(e.target.value)}
        value={item}
      />
      <button
        className="add-todo__btn"
        onClick={() => {
          if (updateData) {
            dispatch(
              actions.updateTodoList({
                ...updateData,
                text: item,
              })
            );
          } else {
            dispatch(
              actions.addTodo({
                id: Math.floor(Math.random() * Date.now()),
                text: item,
                checked: false,
                status: "Active",
              })
            );
          }
          setItem("");
        }}
        disabled={item ? false : true}
      >
        <i className={`fa fa-${updateData ? "save" : "plus"}`}></i>
      </button>
    </div>
  );
};

export default AddTodo;
