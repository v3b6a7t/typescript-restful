import { Response } from 'express';
import { RequestExt } from '../interfaces/extended';

export default ({ docFoundById }: RequestExt, res: Response): void => {
    if (docFoundById) {
        docFoundById.remove()
            .then(() => res.sendStatus(200))
            .catch(err => res.status(404).json(err))
    }
}