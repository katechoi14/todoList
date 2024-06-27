import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    switch (req.method) {
      case 'PUT':
        const updatedTask = req.body;
        console.log(updatedTask);
        const updateResponse = await axios.put(`${CMS_URL}/api/tasks/${id}`, updatedTask);
        res.status(200).json(updateResponse.data);
        break;
      case 'DELETE':
        await axios.delete(`${CMS_URL}/api/tasks/${id}`);
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
