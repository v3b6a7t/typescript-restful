import { Router } from 'express';
import { Model, Document } from 'mongoose';
import setDocFoundById from './middleware/set-docFoundById'
import setDocProcessed from './middleware/set-docProcessed';
import getHandler from './handlers/get-handler';
import postHandler from './handlers/post-handler';
import byIdGetHandler from './handlers/by-id-get-handler';
import byIdPutHandler from './handlers/by-id-put-handler';
import byIdPatchHandler from './handlers/by-id-patch-handler';

// GENERIC ROUTER
export default <T extends Model<Document>>(model: T): Router => {
    const router = Router();
    
    // ROUTE
    router.route('/')
        .get(getHandler<typeof model>(model))
        .post(postHandler<typeof model>(model));

    // USE MIDDLEWARE by id
    router.use('/:id', setDocFoundById<typeof model>(model));
    router.use('/:id', setDocProcessed<typeof model>(model));

    // ROUTE by id 
    router.route('/:id')
        .get(byIdGetHandler)
        .put(byIdPutHandler)
        .patch(byIdPatchHandler);
    return router;
};