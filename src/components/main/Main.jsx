import React from "react";
import { ToDoList } from "./TodoList/ToDoList";
import style from "./main.module.css";

export function Main() {
  return (
    <main className={style.main}>
      <ToDoList />
    </main>
  );
}
