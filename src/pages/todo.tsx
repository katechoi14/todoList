import React from "react";
import TodoList from "../components/ToDoList";

const TodoPage = () => {
    return (
        <div className="text-center text-2xl">
            <h1 className="font-serif">Todo Page</h1>
            <TodoList />
        </div>
    );
};

export default TodoPage;
