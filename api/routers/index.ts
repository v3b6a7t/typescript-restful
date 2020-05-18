import { Router, NextFunction } from 'express';
import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';
import getQuery from './support/getQuery';


export default <T extends Model<Document>>(model: T): Router => {
    const router = Router();

    router.route('/')
        .post((req: Request, res: Response): void => {
            const instance = new model(req.body);
            instance.save();
            res.status(201).json(instance);
        })
        .get((req: Request, res: Response): void => {
            const query = getQuery<typeof req.query, typeof model>(req.query, model);
            model.find(query)
                .sort({ title: 1 })
                .exec()
                .then(docs => res.status(200).json(docs))
                .catch(err => res.status(400).json(err))
        });

    router.use('/:id', (req: Request, res: Response, next: NextFunction) => {
        model.findById(req.params.id)
            .exec()
            .then(doc => {
                if(doc instanceof model) {
                   // req.docFoundById = doc;
                    res.status(200).json(doc)
                    next()
                }
            })
            .catch(err => res.status(400).json(err))
    })

    router.route('/:id')
        .get((req: Request, res: Response): void => {
            model.findById(req.params.id)
                .exec()
                .then(doc => res.status(200).json(doc))
                .catch(err => res.status(400).json(err))
        })
        .put((req: Request, res: Response) => {
            const body = getQuery<typeof req.body, typeof model>(req.body, model);
            model.findByIdAndUpdate(req.params.id, { $set: body })
                .exec()
                .then(doc => res.status(201).json(doc))
                .catch(err => res.status(400).json(err))
        });
    return router;
};
