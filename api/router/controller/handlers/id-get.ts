import { Response } from 'express';
import { RequestExt } from '../../interfaces/extended';

export default ({ docFoundById }: RequestExt, res: Response): void => {
    res.status(200).json(docFoundById);
}