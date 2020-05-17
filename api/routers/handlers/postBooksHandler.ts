import { Request, Response } from 'express';
import Book from '../../models/bookModel';

export default (req: Request, res: Response): void => {
    const book = new Book(req.body);
    book.save();
    res.status(201).json(book);
}