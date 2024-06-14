import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/style.module.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  userName: string;
  date: Date | null;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newTask.trim() === "") {
      alert("New task cannot be empty!");
      return;
    }

    const newT: Task = {
      id: new Date().getTime(),
      text: newTask,
      completed: false,
      userName: userName,
      date: selectedDate,
    };

    setTasks([...tasks, newT]);
    setNewTask("");
    setUserName("");
    setSelectedDate(null);
  }

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    const toggledTask = updatedTasks[index];
    toggledTask.completed = !toggledTask.completed;

    if (toggledTask.completed) {
      updatedTasks.splice(index, 1);
      updatedTasks.unshift(toggledTask);
    }

    setTasks(updatedTasks);
  };

  const editTask = (index: number, newText: string | null) => {
    const updatedTasks = [...tasks];
    if (newText) {
      updatedTasks[index].text = newText;
    }
    setTasks(updatedTasks);
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    const fromIndex = draggedIndex;
    const toIndex = index;

    if (fromIndex !== null && fromIndex !== toIndex) {
      const updatedTasks = [...tasks];
      const movedTask = updatedTasks.splice(fromIndex, 1)[0];
      updatedTasks.splice(toIndex, 0, movedTask);
      setTasks(updatedTasks);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className={styles.todoContainer}>
      <h2>Todo List</h2>
      <form className={styles.form} onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className={styles.taskInput}
        />
        <button type="submit" className={styles.addTaskButton}>
          Add Task
        </button>
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="user-name-input"
        />
        <label htmlFor="selectedDate">Date:</label>
        <DatePicker
          id="selectedDate"
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          className="date-picker"
        />
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className={`${styles.taskItem} ${styles.taskItem.completed ? "completed" : ""} 
            ${draggedIndex === index ? "dragging" : ""}
            ${dragOverIndex === index ? "drag-over" : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <span
              className="toggle-indicator"
              onClick={() => toggleTask(index)}
            >
              ☰
            </span>
            <span
              className={styles.taskText}
              contentEditable={!task.completed}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (!task.completed) {
                  editTask(index, e.target.textContent);
                }
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)} className={styles.deleteButton}>
              Delete
            </button>
            <button onClick={() => toggleTask(index)} className="toggle-button">
              {task.completed ? "Undo" : "Done?"}
            </button>
            <div className="userName">
              <strong>Name:</strong> {task.userName}
            </div>
            <div className="Date">
              <strong>Date:</strong>{" "}
              {task.date ? task.date.toLocaleDateString() : "Not Set"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
