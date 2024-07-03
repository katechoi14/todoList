import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;  
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
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
