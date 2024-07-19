import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const response = await axios.post(`${process.env.CMS_URL}/users/`, {
        email,
        password,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
