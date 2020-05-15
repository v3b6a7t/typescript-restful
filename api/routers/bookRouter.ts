import { Router } from 'express';
import booksHandler from './handlers/booksHandler';


const router = Router();

router.route('/books')
    .get(booksHandler)
    .put(booksHandler);

export default router;
