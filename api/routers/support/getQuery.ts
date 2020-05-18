import { Model, Document } from 'mongoose';
import { Request } from 'express';

export default function <T extends Model<Document>>(request: Request, model: T): object {
    return Object.entries(request.query).reduce((succ, [key, val]) => {
        if (key in model.schema.paths) return Object.assign(succ, { [key]: val });
        return succ;
    }, {})
}