import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import style from "./todolist.module.css";
import { ToDoItem } from "./ToDoItem";
import { BiSolidNotepad } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

export function ToDoList() {
  const { register, handleSubmit, reset } = useForm();
  const [taskList, setTaskList] = useState([]);

  const audioCheckSound = new Audio("/sounds/check.webm");
  const audioAddTaskSound = new Audio("/sounds/add-item.webm");
  const audioDeleteSound = new Audio("/sounds/delete.webm");
  const audioIncorrectSound = new Audio("/sounds/incorrect.webm");

  const handleAddTask = (data) => {
    const taskName = data.taskName;

    const playIncorrectSound = (message) => {
      audioIncorrectSound.volume = 0.2;
      audioIncorrectSound.currentTime = 0;
      audioIncorrectSound.play();

      alert(message);
    };

    if (!taskName) {
      return playIncorrectSound("Nome da tarefa não pode estar em branco !");
    }

    if (taskName.length < 5) {
      return playIncorrectSound(
        "Nome da tarefa deve conter ao menos 5 caracteres"
      );
    }

    const taskItem = { id: uuid(), taskName: taskName, isCompletedTask: false };

    if (taskList.length === 0) {
      setTaskList((prev) => [...prev, taskItem]);
      return reset();
    }

    const isTaskExists = taskList.some((task) => task.taskName === taskName);

    if (isTaskExists) {
      playIncorrectSound("Tarefa já existe na lista");
      return reset();
    }

    audioAddTaskSound.volume = 0.2;
    audioAddTaskSound.currentTime = 0;
    audioAddTaskSound.play();

    setTaskList((prev) => [...prev, taskItem]);

    return reset();
  };

  const handleDeleteTask = (taskId) => {
    setTaskList((prev) => prev.filter((task) => task.id !== taskId));
    audioDeleteSound.volume = 0.1;
    audioDeleteSound.currentTime = 0;
    audioDeleteSound.play();
  };

  const handleEditNameTask = (taskId, taskName) => {
    if (!taskName) {
      alert("Nome da tarefa não pode estar em branco !");
      return false;
    }

    if (taskName.length < 5) {
      alert("Nome da tarefa deve conter ao menos 5 caracteres");
      return false;
    }

    const isTaskExists = taskList.some(
      (task) => task.taskName === taskName && task.id !== taskId
    );

    if (isTaskExists) {
      alert("Tarefa já existe na lista");
      return false;
    }

    setTaskList((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, taskName } : task))
    );

    return true;
  };

  const handleCheckTask = (taskId) => {
    setTaskList((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newChecked = !task.isCompletedTask;

          if (newChecked) {
            audioCheckSound.volume = 0.2;
            audioCheckSound.currentTime = 0;
            audioCheckSound.play();
          }

          return { ...task, isCompletedTask: newChecked };
        }

        return task;
      })
    );
  };

  return (
    <div className={style.toDoList}>
      <div className={style.tittleWrapper}>
        <h1 className={style.tittle}>My ToDo List</h1>
        <div className={style.tittleIcon}>
          <BiSolidNotepad className={style.notepadIcon} />
          <FaPencilAlt className={style.pencilIcon} />
        </div>
      </div>

      <div className={style.formWrapper}>
        <form onSubmit={handleSubmit(handleAddTask)}>
          <input
            type="text"
            className={style.inputAddTask}
            placeholder="Adicione uma tarefa"
            {...register("taskName")}
          />
          <button type="submit" className={style.buttonAddTask}>
            <MdAdd className={style.iconAddTask} />
          </button>
        </form>
        {taskList.length !== 0 ? (
          <ul className={style.listTasks}>
            {taskList.map((task) => {
              return (
                <ToDoItem
                  key={task.id}
                  taskId={task.id}
                  taskName={task.taskName}
                  isCompletedTask={task.isCompletedTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditNameTask}
                  onCheck={handleCheckTask}
                />
              );
            })}
          </ul>
        ) : (
          <p className={style.taskNotFound}>
            Nenhuma tarefa criada até o momento
          </p>
        )}
      </div>
    </div>
  );
}
