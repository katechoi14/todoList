import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import qs from 'qs';

const CMS_URL = process.env.CMS_URL;
const JWT_SECRET = process.env.JWT_SECRET;


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized'});
  }
  try {
    
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const taskResponse = await axios.get(`${CMS_URL}/api/tasks/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const task = taskResponse.data;

    if (task.user.id !== decoded.id) {
      return res.status(403).json({ message: 'Forbidden'});
    }

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
        const updateResponse = await axios.put(putUrl, updatedTask, {
          headers: {
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
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
            'Authorization': `Bearer ${token}`,
          }
        });
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
