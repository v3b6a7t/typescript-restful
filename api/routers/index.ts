import { Router } from 'express';
import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';
import getQuery from './support/getQuery'


export default <T extends Model<Document>>(model: T): Router => {
    const router = Router();

    router.route('/')
    .post((req: Request, res: Response): void => {
        const instance = new model(req.body);
        instance.save();
        res.status(201).json(instance);
    })
    .get((req: Request, res: Response): void => {
        const query = getQuery<typeof model>(req, model);
        model.find(query)
            .sort({ title: 1 })
            .exec()
            .then(docs => res.status(200).json(docs))
            .catch(err => res.status(400).json(err))
    });

    router.route('/:bookId')
    .get((req: Request, res: Response): void => {
        model.findById(req.params.bookId)
            .exec()
            .then(doc => res.status(200).json(doc))
            .catch(err => res.status(400).json(err))
    });

    return router;
};
