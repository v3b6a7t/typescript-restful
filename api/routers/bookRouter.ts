import { Router } from 'express';
import getBooksHandler from './handlers/getBooksHandler';
import postBooksHandler from './handlers/postBooksHandler';
import getBooksByIdHandler from './handlers/getBooksByIdHandler';


const router = Router();

router.route('/books')
    .post(postBooksHandler)
    .get(getBooksHandler);

router.route('/books/:bookId')
    .get(getBooksByIdHandler);

export default router;
