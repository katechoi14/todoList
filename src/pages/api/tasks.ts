import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const CMS_URL = process.env.CMS_URL;
const JWT_SECRET = process.env.JWT_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);

      switch (req.method) {
        case 'GET':
          const response = await axios.get(`${CMS_URL}/api/tasks`, {
            headers: {
              "Content-Type": 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          });
          const userTasks = response.data.docs.filter((task: any) => task.user === decoded.id);
          res.status(200).json(userTasks);
          break;
        case 'POST':
          const newTask = {...req.body, user: decoded.id };
          try {
            const createResponse = await axios.post(`${CMS_URL}/api/tasks`, newTask, {
              headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}`,
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