import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

export default <M extends Model<Document>>(model: M) => {
    return (req: Request, res: Response): void => {
        const instance = new model(req.body);
        instance.save()
            .then(() => res.status(201).json(instance))
            .catch(err => res.status(404).json(err));
    }
}