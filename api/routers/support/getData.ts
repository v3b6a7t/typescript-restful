import { Model, Document } from 'mongoose';

const forbidden: string[] = ['_id', '__v'];

export default function <D extends object, M extends Model<Document>>(data: D, model: M, empty = false): object {
    
    const queryData = (): object => Object.entries(data).reduce((succ, [key, val]) => {
                            if (!forbidden.includes(key) && (key in model.schema.paths)) return Object.assign(succ, { [key]: val });
                            return succ;
                        }, {})
    
    const emptyData = (): object => Object.keys(model.schema.paths).reduce((succ, key) => {
                            if (!forbidden.includes(key) && !(key in data)) return Object.assign(succ, { [key]: undefined });
                            return succ;
                        }, {})
    
    return Object.assign(
                queryData(), 
                empty? emptyData() : {}
            );
}