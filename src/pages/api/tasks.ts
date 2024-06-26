import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const response = await axios.get(`${CMS_URL}/api/tasks`);
        res.status(200).json(response.data);
        break;
      case 'POST':
        const newTask = req.body;
        const createResponse = await axios.post(`${CMS_URL}/api/tasks`, newTask);
        res.status(201).json(createResponse.data);
        break;
      case 'PUT':
        const updatedTask = req.body;
        const updateResponse = await axios.put(`${CMS_URL}/api/tasks`, updatedTask);
        res.status(200).json(updateResponse.data);
        break;
      case 'DELETE':
        const { id } = req.query;
        await axios.delete(`${CMS_URL}/api/tasks?id=${id}`);
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
