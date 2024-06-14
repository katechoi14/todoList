import React from "react";
import TodoList from "../components/ToDoList";
import styles from '../style.module.css';

const TodoPage = () => {
    return (
        <div>
            <h1>Todo Page</h1>
            <TodoList />
        </div>
    );
};

export default TodoPage;