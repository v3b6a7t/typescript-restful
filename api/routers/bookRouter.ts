import { Router } from 'express';
import booksHandler from './handlers/booksHandler';
import booksByIdHandler from './handlers/booksByIdHandler';


const router = Router();

router.route('/books')
    .get(booksHandler)
    .put(booksHandler);

router.route('/books/:bookId')
    .get(booksByIdHandler)
    .put(booksByIdHandler);

export default router;
