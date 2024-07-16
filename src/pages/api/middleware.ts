import { NextApiRequest, NextApiResponse } from "next";
import { checkApiKey } from './checkApiKey';

export const validateKey = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const apiKey = req.headers['authorization']?.split(' ')[1];

    if (checkApiKey(apiKey)) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized'});
    }
};