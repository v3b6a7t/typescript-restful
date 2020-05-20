import { Request, Response } from 'express';
import { ModelType } from '../interfaces/types';
import getData from '../support/getData';

export default <M extends ModelType>(model: M) => {
    return (req: Request, res: Response): void => {
        const query = getData<typeof req.query, M>(req.query, model);
        model.find(query)
            .exec()
            .then(docs => res.status(200).json(docs))
            .catch(err => res.status(400).json(err))
    }
}