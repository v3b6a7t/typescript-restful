import { Request, Response } from 'express';
import { ModelType } from '../interfaces/types';
import getData from '../support/getData';

export default <M extends ModelType>(model: M) => {
    return ({ query }: Request, res: Response): void => {
        const data = getData<typeof query, M>(query, model);
        model.find(data)
            .exec()
            .then(docs => res.status(200).json(docs))
            .catch(err => res.status(404).json(err))
    }
}