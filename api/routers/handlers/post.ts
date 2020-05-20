import { Request, Response } from 'express';
import { ModelType } from '../interfaces/types';
import getData from '../support/getData';

export default <M extends ModelType>(model: M) => {
    return ({ body }: Request, res: Response): void => {
        const data = getData<typeof body, M>(body, model);
        const instance = new model(data);
        instance.save()
            .then(() => res.status(201).json(instance))
            .catch(err => res.status(404).json(err));
    }
}