import { Response } from 'express';
import { ExtendedRequest } from '../interfaces';

export default (req: ExtendedRequest, res: Response): void => {
    res.status(200).json(req.docFoundById);
}