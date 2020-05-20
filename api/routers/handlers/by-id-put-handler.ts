import { Response }  from 'express';
import { RequestExt } from '../interfaces/extended'

export default (req: RequestExt, res: Response): void => {
    if (req.docProcessed) {
        req.docProcessed.save()
            .then(() => res.status(201).json(req.docProcessed))
            .catch(err => res.status(405).json(err));
    }
}