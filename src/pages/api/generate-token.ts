import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

const CMS_URL = process.env.CMS_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    try {
        const response = await axios.post(`${CMS_URL}/api/auth/login`, { email, password});
        const { token } = response.data;

        res.status(200).json({ accessToken: token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};