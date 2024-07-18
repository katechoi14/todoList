import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { validateKey } from './middleware';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized'});
  }

    try {
      switch (req.method) {
        case 'GET':
          const response = await axios.get(`${CMS_URL}/api/tasks`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          res.status(200).json(response.data);
          break;
        case 'POST':
          const newTask = req.body;
          try {
            const createResponse = await axios.post(`${CMS_URL}/api/tasks`, newTask, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            res.status(201).json(createResponse.data);
          } catch (error) {
            res.status(500).json({ url: `${CMS_URL}/api/tasks`, newTask, error });
          }
          break;
        default:
          res.setHeader('Allow', ['GET', 'POST']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};