import { Request, Response } from 'express';
import Book from '../../models/bookModel';


function getBooksHandler(req: Request, res: Response): void {
    Book.findById(req.params.bookId)
        .exec()
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(400).json(err))
}

 export default getBooksHandler;