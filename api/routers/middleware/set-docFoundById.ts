import { Response, NextFunction } from 'express';
import { ModelType } from '../interfaces/types';
import { RequestExt } from '../interfaces/extended';

export default <M extends ModelType>(model: M) => {
    return (req: RequestExt, res: Response, next: NextFunction): void => {
        model.findById(req.params.id).exec()
            .then(doc => {
                if (doc) {
                    req.docFoundById = doc;
                    return next();
                }
                res.sendStatus(404);
                return;
            })
            .catch(err => res.status(400).json(err))
    }
}
