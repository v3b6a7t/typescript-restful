import { Model, Document } from 'mongoose';

const forbidden: string[] = ['_id', '__v'];

export default function <D extends object, M extends Model<Document>>(data: D, model: M): object {
    return Object.keys(model.schema.paths).reduce((succ, key) => {
        if (!forbidden.includes(key) && !(key in data)) return Object.assign(succ, { [key]: undefined });
        return succ;
    }, {})
}