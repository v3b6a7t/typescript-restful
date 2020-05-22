/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import { ModelType } from '../interfaces/types';

// TYPE
export type ControllerHandler = (req: Request, res: Response) => void;

// INTERFACE
export interface ControllerInterface {
        [index: string]: { [index: string]: ControllerHandler };
    }

// CONTROLLER
export default async <M extends ModelType>(model: M): Promise<ControllerInterface> => ({
        default: {
            get: (await import('./handlers/get')).default<M>(model),
            post: (await import('./handlers/post')).default<M>(model)
        },
        id: { 
            get: (await import('./handlers/id-get')).default,
            put: (await import('./handlers/id-put')).default,
            patch: (await import('./handlers/id-patch')).default,
            delete: (await import('./handlers/id-delete')).default
        }
    })