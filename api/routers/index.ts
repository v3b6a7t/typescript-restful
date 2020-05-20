import { Router } from 'express';
import { ModelType } from './interfaces/types';
import setDocFoundById from './middleware/set-docFoundById'
import setDocProcessed from './middleware/set-docProcessed';
import getHandler from './handlers/get-handler';
import postHandler from './handlers/post-handler';
import byIdGetHandler from './handlers/by-id-get-handler';
import byIdPutHandler from './handlers/by-id-put-handler';
import byIdPatchHandler from './handlers/by-id-patch-handler';

// GENERIC ROUTER
export default <M extends ModelType>(model: M): Router => {
    const router = Router();
    
    // ROUTE
    router.route('/')
        .get(getHandler<M>(model))
        .post(postHandler<M>(model));

    // USE MIDDLEWARE by id
    router.use('/:id', setDocFoundById<M>(model));
    router.use('/:id', setDocProcessed<M>(model));

    // ROUTE by id 
    router.route('/:id')
        .get(byIdGetHandler)
        .put(byIdPutHandler)
        .patch(byIdPatchHandler);
        
    return router;
};