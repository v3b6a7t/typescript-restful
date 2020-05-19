import { Model, Document } from 'mongoose';
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../interfaces';

export default <M extends Model<Document>>(model: M) => {
    return (req: ExtendedRequest, res: Response, next: NextFunction): void => {
        model.findById(req.params.id)
            .exec()
            .then(doc => {
                if (doc instanceof Document) {
                    req.docFoundById = doc;
                    return next();
                }
                res.sendStatus(404);

            })
            .catch(err => res.status(400).json(err))
    }
}
