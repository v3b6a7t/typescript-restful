import { Router } from 'express';
import { ModelType } from './interfaces/types';
import setDocFoundById from './middleware/set-docFoundById'
import setDocProcessed from './middleware/set-docProcessed';
import GET from './handlers/get';
import POST from './handlers/post';
import GETid from './handlers/id-get';
import PUTid from './handlers/id-put';
import PATCHid from './handlers/id-patch';

// GENERIC ROUTER
export default <M extends ModelType>(model: M): Router => {
    const router = Router();

    // ROUTE
    router.route('/')
        .get(GET<M>(model))
        .post(POST<M>(model));

    // USE MIDDLEWARE by id
    router.use('/:id', setDocFoundById<M>(model));
    router.use('/:id', setDocProcessed<M>(model));

    // ROUTE by id 
    router.route('/:id')
        .get(GETid)
        .put(PUTid)
        .patch(PATCHid);

    return router;
};