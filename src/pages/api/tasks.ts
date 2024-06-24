import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

let tasks: Task[] = [];

interface Task {
    id: string;
    title: string;
    completed: boolean;
    userName: string;
    date: Date | null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            getTasks(req, res);
            break;
        case 'POST':
            addTask(req, res);
            break;
        case 'PUT':
            updateTask(req, res);
            break;
        case 'DELETE':
            deleteTask(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


const getTasks = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(tasks);
}

const addTask = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { 
            title,
            completed,
            userName,
            date,
        } = req.body;
        const newTask: Task = {
            id: uuidv4(),
            title,
            completed,
            userName,
            date: date ? new Date(date): null,
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Cannot add task: ", error);
        res.status(500).json({ message: "Failed to add task"});
    }
};

const updateTask = (req: NextApiRequest, res: NextApiResponse) => {
    const {
        id,
        title,
        completed,
        userName,
        date
    } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({message: 'Task not found'});
    }
    tasks[taskIndex] = {
        id, 
        title,
        completed,
        userName,
        date: date ? new Date(date): null
    };
    res.status(200).json(tasks[taskIndex]);
};

const deleteTask = (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found'});
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json(deletedTask);
}

export const getTodos = async () => {
    const response = await axios.get('/api/tasks');
    return response.data;
};

export const addTodo = async (task: Omit<Task, 'id'>) => {
    const response = await axios.post('/api/tasks', task);
    return response.data;
};

export const updateTodo = async (id: string, updatedTask: Task) => {
    const response = await axios.put('/api/tasks', { id, ...updatedTask });
    return response.data;
};

export const deleteTodo = async (id: string) => {
    const response = await axios.delete(`/api/tasks?id=${id}`);
    return response.data;
}

