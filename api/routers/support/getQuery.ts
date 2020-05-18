import { Model, Document } from 'mongoose';

export default function <D extends object, M extends Model<Document>>(data: D, model: M): object {
    return Object.entries(data).reduce((succ, [key, val]) => {
        if (key in model.schema.paths) return Object.assign(succ, { [key]: val });
        return succ;
    }, {})
}