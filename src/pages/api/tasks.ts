import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const response = await axios.get('http://localhost:3001/api/tasks');
        res.status(200).json(response.data);
        break;
      case 'POST':
        const newTask = req.body;
        const createResponse = await axios.post('http://localhost:3001/api/tasks', newTask);
        res.status(201).json(createResponse.data);
        break;
      case 'PUT':
        const updatedTask = req.body;
        const updateResponse = await axios.put('http://localhost:3001/api/tasks', updatedTask);
        res.status(200).json(updateResponse.data);
        break;
      case 'DELETE':
        const { id } = req.query;
        await axios.delete(`http://localhost:3001/api/tasks/${id}`);
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
