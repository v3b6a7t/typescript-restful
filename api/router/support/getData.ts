import { ModelType } from '../interfaces/types';

export default <D extends object, M extends ModelType>(data: D, model: M, empty = false): object => {

    const queryData = (): object => Object.entries(data).reduce((succ, [key, val]) => (
        (key in model.schema.obj) ? Object.assign(succ, { [key]: val }) : succ
    ), {})

    const emptyData = (): object => Object.keys(model.schema.obj).reduce((succ, key) => (
        (key in data) ? succ : Object.assign(succ, { [key]: undefined })
    ), {})

    return Object.assign(
        queryData(),
        empty ? emptyData() : {}
    );
}