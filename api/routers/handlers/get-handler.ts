import { Model, Document } from 'mongoose';
import { Request, Response } from 'express';
import getData from '../support/getData';

export default <M extends Model<Document>>(model: M) => {
    return (req: Request, res: Response): void => {
        const query = getData<typeof req.query, typeof model>(req.query, model);
        model.find(query)
            .exec()
            .then(docs => res.status(200).json(docs))
            .catch(err => res.status(400).json(err))
    }
}