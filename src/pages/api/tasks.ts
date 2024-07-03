import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;  // Extracting the id from query parameters

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
        if (!id) {
          res.status(400).json({ message: 'Task ID is required' });
          return;
        }
        const updatedTask = req.body;
        const putUrl = `${CMS_URL}/api/tasks/${id}`;
        const updateResponse = await axios.put(putUrl, updatedTask);
        res.status(200).json(updateResponse.data);
        break;
      case 'DELETE':
        if (!id) {
          res.status(400).json({ message: 'Task ID is required' });
          return;
        }
        const deleteUrl = `${CMS_URL}/api/tasks/${id}`;
        await axios.delete(deleteUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
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
