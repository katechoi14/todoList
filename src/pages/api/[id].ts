import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  // chnange w the payload cms
  const { id } = req.query;
  try {
    switch (req.method) {
      case 'PUT':
        const updatedTask = req.body;
        const updateUrl = `${CMS_URL}/api/tasks/${qs.stringify({ id })}`;
        const updateResponse = await axios.put(updateUrl, updatedTask);
        res.status(200).json(updateResponse.data);
        break;
      case 'DELETE':
        const deleteUrl = `${CMS_URL}/api/tasks/${qs.stringify({ id})}`;
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
