import { Router } from 'express';
import { ModelType } from './interfaces/types';
import setDocFoundById from './middleware/set-docFoundById'
import setDocProcessed from './middleware/set-docProcessed';
import controller from './controller';

// GENERIC ROUTER
export default <M extends ModelType>(model: M): Router => {
    const router = Router();
    const rest = controller<M>(model);

    // ROUTE (default)
    router.route('/')
        .get(rest.default.get)
        .post(rest.default.post);

    // USE MIDDLEWARE (id)
    router.use('/:id', [
        setDocFoundById<M>(model),
        setDocProcessed<M>(model)
    ]);

    // ROUTE (id)
    router.route('/:id')
        .get(rest.id.get)
        .put(rest.id.put)
        .patch(rest.id.patch)
        .delete(rest.id.delete);

    return router;
};