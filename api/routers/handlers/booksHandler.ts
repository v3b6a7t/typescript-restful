import { Request, Response } from 'express';
import getQuery from './support/getQueryProcessed'
import Book from '../../models/bookModel';


function booksHandler(req: Request, res: Response): void {
    const query = getQuery<typeof Book>(req, Book);
    Book.find(query)
        .sort({ title: 1 })
        .exec()
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(400).json(err))
}

 export default booksHandler;