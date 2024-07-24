import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse ) => {
    try {
        if (req.method === 'POST') {
            const { email, password } = req.body;

            const response = await axios.post(`${CMS_URL}/api/auth/local/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            res.status(200).json(response.data);
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};