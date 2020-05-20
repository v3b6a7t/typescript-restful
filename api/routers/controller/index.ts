/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import { ModelType } from '../interfaces/types';

import GET from './handlers/get';
import POST from './handlers/post';
import id_GET from './handlers/id-get';
import id_PUT from './handlers/id-put';
import id_PATCH from './handlers/id-patch';
import id_DELETE from './handlers/id-delete';

// TYPE
export type ControllerHandler = (req: Request, res: Response) => void;

// INTERFACE
export interface ControllerInterface {
    [index: string]: { [index: string]: ControllerHandler };
}

// CONTROLLER
export default <M extends ModelType>(model: M): ControllerInterface => ({
        default: {
            get: GET<M>(model),
            post: POST<M>(model),
        },
        id: { 
            get: id_GET,
            put: id_PUT,
            patch: id_PATCH,
            delete: id_DELETE
        }
    })