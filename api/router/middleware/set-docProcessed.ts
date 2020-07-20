import { ModelType } from '../interfaces/types';
import { Response, NextFunction } from 'express';
import { RequestExt } from '../interfaces/extended';
import getData from '../support/getData';


export default <M extends ModelType>(model: M) => {
    return (req: RequestExt, res: Response, next: NextFunction): void => {
        if(req.docFoundById && ['PUT', 'PATCH'].includes(req.method)) {
            req.docProcessed = 
                Object.assign(req.docFoundById, 
                    getData<typeof req.body, M>(
                        req.body, model, 
                        (req.method === 'PUT')
                ));
        }
        next();
    }
}