import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  function addTask(e) {
    e.preventDefault();

    if (newTask.trim() === "") {
      alert("New task cannot be empty!");
      return 0;
    }

    const newT = {
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

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    const toggledTask = updatedTasks[index];
    toggledTask.completed = !toggledTask.completed;

    if (toggledTask.completed) {
      updatedTasks.splice(index, 1);
      updatedTasks.unshift(toggledTask);
    }

    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const fromIndex = draggedIndex;
    const toIndex = index;

    if (fromIndex !== toIndex) {
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
    <div className="todo-container">
      <h2>Todo List</h2>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="task-input"
        />
        <button type="submit" className="add-task-button">
          Add Task
        </button>
        <label for="userName">Name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="user-name-input"
        />
        <label for="selectedDate">Date:</label>
        <DatePicker
          id="selectedDate"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="date-picker"
        />
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""} 
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
              className="task-text"
              contentEditable={!task.completed}
              supressContentEditableWarning
              onBlur={(e) => {
                if (!task.completed) {
                  editTask(index, e.target.textContent);
                }
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)} className="delete-button">
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
