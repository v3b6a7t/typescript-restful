import { Router, NextFunction  } from 'express';
import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';
import getQuery from './support/getQuery';
import getEmpty from './support/getEmpty';

// INTERFACE
export interface ExtendedRequest extends Request {
    docFoundById?: Document;
    docProcessed?: Document;
}

// GENERIC ROUTER
export default <T extends Model<Document>>(model: T): Router => {
    const router = Router();

    // ROUTE with search
    router.route('/')
        .get((req: Request, res: Response): void => {
            const query = getQuery<typeof req.query, typeof model>(req.query, model);
            model.find(query)
                .exec()
                .then(docs => res.status(200).json(docs))
                .catch(err => res.status(400).json(err))
        })
        .post((req: Request, res: Response): void => {
            const instance = new model(req.body);
            instance.save()
                .then(() => res.status(201).json(instance))
                .catch(err => res.status(404).json(err));
        });

    // USE MIDDLEWARE by id
    router.use('/:id', (req: ExtendedRequest, res: Response, next: NextFunction) => {
        model.findById(req.params.id)
            .exec()
            .then(doc => {
                if (doc instanceof model) {
                    req.docFoundById = doc;
                    next();
                }
                else res.sendStatus(404);
            })
            .catch(err => res.status(400).json(err))
    });
    router.use('/:id', (req: ExtendedRequest, res: Response, next: NextFunction) => {
        if(['PUT', 'PATCH'].includes(req.method)) {
            const body = getQuery<typeof req.body, typeof model>(req.body, model);
            const empty = (req.method === 'PUT')? getEmpty<typeof body, typeof model>(body, model) : {};
            req.docProcessed = Object.assign(req.docFoundById, body, empty);
        }
        next();
    });

    // ROUTE by id 
    router.route('/:id')
        .get((req: ExtendedRequest, res: Response): void => {
            res.status(200).json(req.docFoundById);
        })
        .put((req: ExtendedRequest, res: Response): void => {
            if(req.docProcessed) {
                req.docProcessed.save()
                    .then(() => res.status(201).json(req.docProcessed))
                    .catch(err => res.status(405).json(err));
            }
        })
        .patch((req: ExtendedRequest, res: Response): void => {
            if (req.docProcessed) {
                req.docProcessed.save()
                    .then(() => res.status(201).json(req.docProcessed))
                    .catch(err => res.status(405).json(err));
            }
        });
    return router;
};