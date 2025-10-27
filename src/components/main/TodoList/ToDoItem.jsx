import React, { useState } from "react";
import style from "./todoitem.module.css";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

export function ToDoItem({
  taskId,
  taskName,
  isCompletedTask = false,
  onDelete,
  onEdit,
  onCheck,
}) {
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [isToEdit, setIsToEdit] = useState(false);

  return (
    <li className={!isCompletedTask ? style.taskItem : style.taskItemChecked}>
      {!isToEdit && (
        <div className={style.taskCheckWrapper}>
          <input
            type="checkbox"
            className={style.isCompletedTask}
            defaultChecked={isCompletedTask}
            onChange={() => onCheck(taskId)}
          />
        </div>
      )}
      <div
        className={style.taskNameWrapper}
        style={{ width: !isToEdit ? "80%" : "90%" }}
      >
        {!isToEdit ? (
          <span>{taskName}</span>
        ) : (
          <input
            className={style.editNameTask}
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            disabled={!isToEdit}
          />
        )}
      </div>
      <div className={style.buttonWrapper}>
        {!isToEdit ? (
          <FaPencilAlt
            className={style.editTask}
            onClick={() => setIsToEdit(!isToEdit)}
          />
        ) : (
          <FaSave
            className={style.editTask}
            onClick={() => {
              const sucess = onEdit(taskId, newTaskName);
              if (sucess) {
                setIsToEdit(!isToEdit);
              }
            }}
          />
        )}

        {!isToEdit ? (
          <FaRegTrashCan
            onClick={() => onDelete(taskId)}
            className={style.clearTask}
          />
        ) : (
          <MdCancel
            onClick={() => (setNewTaskName(taskName), setIsToEdit(!isToEdit))}
            className={style.clearTask}
          />
        )}
      </div>
    </li>
  );
}
