import { Model, Document } from 'mongoose';
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../interfaces';
import getData from '../support/getData';


export default <M extends Model<Document>>(model: M) => {
    return (req: ExtendedRequest, res: Response, next: NextFunction): void => {
        if(req.docFoundById && ['PUT', 'PATCH'].includes(req.method)) {
            req.docProcessed = 
                Object.assign(req.docFoundById, 
                    getData<typeof req.body, typeof model>(
                        req.body, model, 
                        (req.method === 'PUT')
                ));
        }
        next();
    }
}