import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

const CMS_URL = process.env.CMS_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            const response = await axios.get(`${CMS_URL}/api/tasks`, { email });

            const emailExists = response.data.exists;

            if (emailExists) {
                return res.status(200).json({ exists: true });
            }
            res.status(200).json({ exists: false});
 
        } catch (error) {
            console.error('Error checking email:', error);
            res.status(500).json({ message: "Internal server error."});
        }
    }
}