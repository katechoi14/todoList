import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import jwt from 'jsonwebtoken';

const CMS_URL = process.env.CMS_URL;
const JWT_SECRET = process.env.JWT_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse ) => {
    try {
        if (req.method === 'POST') {
            const { email, password } = req.body;

            const response = await axios.post(`${CMS_URL}/api/users/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { user } = response.data;
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1hr' });
            res.status(200).json({ token });
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};