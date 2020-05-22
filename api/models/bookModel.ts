import mongoose, { Schema, Document } from 'mongoose';

export interface BookInterface extends Document {
    title: string;
    author: string;
    genre: string;
    read: boolean;
}

export const BookSchema = new Schema<BookInterface>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    read: { type: Boolean, default: false }
});

export const BookModel = mongoose.model('books', BookSchema);

export type BookType = typeof BookModel;

export default BookModel;