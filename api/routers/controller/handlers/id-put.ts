import { Response } from 'express';
import { RequestExt } from '../../interfaces/extended'

export default ({ docProcessed }: RequestExt, res: Response): void => {
    if (docProcessed) {
        docProcessed.save()
            .then(() => res.status(201).json(docProcessed))
            .catch(err => res.status(404).json(err));
    }
}