import { Response } from 'express';
import { RequestExt } from '../interfaces/extended';

export default (req: RequestExt, res: Response): void => {
    res.status(200).json(req.docFoundById);
}