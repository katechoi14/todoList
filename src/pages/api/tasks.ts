import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  userName: string;
  date: Date | null;
}

let tasks: Task[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getTasks(req, res);
    case 'POST':
      return addTask(req, res);
    case 'PUT':
      return updateTask(req, res);
    case 'DELETE':
      return deleteTask(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getTasks = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ tasks });
}

const addTask = (req: NextApiRequest, res: NextApiResponse) => {
  const { title, completed, userName, date } = req.body;
  const newTask: Task = {
    id: uuidv4(),
    title,
    completed,
    userName,
    date: date ? new Date(date) : null,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
}

const updateTask = (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, completed, userName, date } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = { id, title, completed, userName, date: date ? new Date(date) : null };
  res.status(200).json(tasks[taskIndex]);
}

const deleteTask = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).json(deletedTask[0]);
}
