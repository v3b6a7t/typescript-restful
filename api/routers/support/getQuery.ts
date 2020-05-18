import { Model, Document } from 'mongoose';
import { Request } from 'express';

<<<<<<< HEAD:api/routers/support/getQueryProcessed.ts
/**
 * 
 * @param request 
 * @param model 
 */
function getQueryProcessed<T extends Model<Document>>(request: Request, model: T): object {
=======
export default function <T extends Model<Document>>(request: Request, model: T): object {
>>>>>>> dev:api/routers/support/getQuery.ts
    return Object.entries(request.query).reduce((succ, [key, val]) => {
        if (key in model.schema.paths) return Object.assign(succ, { [key]: val });
        return succ;
    }, {})
}