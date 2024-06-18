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
    <div className="flex flex-col justify-center items-center overflow-x-hidden max-w-full min-h-screen">
      <div className="text-center">
        <h2 className="h-20 text-xl">Todo List</h2>
        <form onSubmit={addTask}>
          <div className="flex flex-col gap-6 w-72">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                id="task"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" 
                placeholder=" "
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <label htmlFor="task" className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Task
              </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                id="username"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" 
                placeholder=" "
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="username" className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Username
              </label>
            </div>
            <div className="relative min-w-[200px] h-10">
              <DatePicker
                id="selectedDate"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                placeholderText="Date"
              />
              <label htmlFor="selectedDate" className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              </label>
            </div>
          </div>
          <div className="w-72 max-w-full mt-4">
            <button 
              type="submit"
              className="text-base bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Add Task!
            </button>
          </div>
        </form>
      </div>
  <ul className="list-none p-0 w-full max-w-full">
  {tasks.map((task, index) => (
    <li
      key={task.id}
      className={`flex items-center border-b border-gray-200 py-3 ${task.completed ? "line-through text-gray-400" : ""} 
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
        className="flex-1 taskText break-all"
      >
        {task.text}
      </span>
      <div className="userName flex-1 border-l border-gray-200 pl-3">
        <p>{task.userName}</p>
      </div>
      <div className="Date border-l border-gray-200 pl-3">
        <p>{task.date ? task.date.toLocaleDateString() : ""}</p>
      </div>
      <div className="flex-1">
        <button onClick={() => deleteTask(index)} 
        className="text-base bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          delete
        </button>
      </div>
      <div className="flex-0">
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
