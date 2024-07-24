import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'POST':
        const newUser = req.body;
        const newResponse = await axios.post(`${CMS_URL}/api/users`, newUser, {
          headers: {
            "Content-Type": 'application/json',
          }
        });
        res.status(201).json(newResponse.data);
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error'});
    }
  };

