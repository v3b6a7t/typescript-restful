import { Response }  from 'express';
import { ExtendedRequest } from '../interfaces'

export default (req: ExtendedRequest, res: Response): void => {
    if (req.docProcessed) {
        req.docProcessed.save()
            .then(() => res.status(201).json(req.docProcessed))
            .catch(err => res.status(405).json(err));
    }
}