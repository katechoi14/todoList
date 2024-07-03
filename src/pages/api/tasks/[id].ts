import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;  
  try {
    
    switch (req.method) {
      case 'PUT':
        const stringifiedQuery = qs.stringify({
          where: {
            id,
            draft: req.query.draft,
            depth: req.query.depth,
          },
        }, { addQueryPrefix: true });
        const updatedTask = req.body;
        const putUrl = `${CMS_URL}/api/tasks/${id}${stringifiedQuery}`;
        const updateResponse = await axios.put(putUrl, updatedTask);
        res.status(200).json(updateResponse.data);
        break;
      case 'DELETE':
        const stringified = qs.stringify({
          where: {
            id,
            draft: req.query.draft,
            depth: req.query.depth,
          },
        }, { addQueryPrefix: true });
        const deleteUrl = `${CMS_URL}/api/tasks/${id}${stringified}`;
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
