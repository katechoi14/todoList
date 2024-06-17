import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="flex flex-col justify-center items-center overflow-x-hidden max-w-full">
      <div className="text-center">
        <h2 className="h-20 text-xl flex items-center justify-center">Todo List</h2>
        <form className="items-center" onSubmit={addTask}>
          <div className="w-72">
            <div className="relative w-full min-w-[200px] h-10">
              <input 
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:bolder placeholder-shown:border-blue-gray-200 placeholder-shown: border border-gray-200 focus:border-gray-900 text-sm px-3 py-2.5 rounded-[7px]"
                placeholder=" "
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Task
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center w-72 max-w-full mt-4">
            <div className="relative w-full min-w-[200px] h-10">
              <input 
                type="text"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="userName" className="aflex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Username
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center w-72 max-w-full mt-6">
            <div className="relative w-full min-w-[200px] h-11">
              <DatePicker
                id="selectedDate"
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-0"
              />
              <label htmlFor="selectedDate" className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              date</label>
            </div>
          </div>
          <div className="flex justify-center items-center w-72 max-w-full mt-4">
            <button 
              type="submit"
              className="text-base bg-transparent hover:bg-pinkpink text-pinkpink font-semibold hover:text-white py-2 px-4 border border-pinkpink hover:border-transparent rounded">
              Add Task!
            </button>
          </div>
        </form>
      </div>
      <ul className="list-none p-0 w-full max-w-full">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className={`flex items-center ${task.completed ? "line-through text-gray-400" : ""} 
            ${draggedIndex === index ? "opacity-50" : ""}
            ${dragOverIndex === index ? "border-dashed border-2 border-black" : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <span
              className="toggle-indicator cursor-pointer"
              onClick={() => toggleTask(index)}
            >
              ☰
            </span>
            <span
              contentEditable={!task.completed}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (!task.completed) {
                  editTask(index, e.target.textContent);
                }
              }}
              className="flex-1 taskText"
            >
              {task.text}
            </span>
            <div className="userName">
              <p>{task.userName}</p>
            </div>
            <div className="Date">
              <p>{task.date ? task.date.toLocaleDateString() : ""}</p>
            </div>
            <div>
              <button onClick={() => deleteTask(index)} 
              className="text-base bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                delete
              </button>
            </div>
            <div>
              <button onClick={() => toggleTask(index)} 
              className="text-base bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 border border-gray-200 rounded shadow">
                {task.completed ? "Undo" : "Done?"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default TodoList;
