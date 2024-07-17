import { NextApiRequest, NextApiResponse } from "next";
import { checkApiKey } from './checkApiKey';

export const validateKey = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const apiKey = 'my-secret-key';

    if (checkApiKey(apiKey)) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized'});
    }
};