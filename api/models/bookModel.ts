import mongoose, { Schema, Document } from 'mongoose';
import stringValidator from './validator/stringValidator'

export interface BookInterface extends Document {
    title: string;
    author: string;
    genre: string;
    read: boolean;
}

export const BookSchema = new Schema<BookInterface>({
    title: {
        type: String,
        required: true,
        validate: stringValidator({
            min: 3,
            max: 50,
            match: /^\p{Lu}[\p{L}\p{N}\p{P}\p{Z}]+$/gu,
            info: "Title contains illegal characters"
        })
    },
    author: {
        type: String,
        required: true,
        validate: stringValidator({
            min: 3,
            max: 50,
            match: /^((\p{Lu}\.|\p{Lu}[\p{Ll}]+)\s?){1,3}\s(\p{Lu}[\p{Ll}\x2D]+){1,2}$/gu,
            info: "Enter the name or initials and the last name of the author"
        })
    },
    genre: {
        type: String,
        required: true,
        validate: stringValidator({
            min: 3,
            max: 20,
            match: /[a-z0-9\x2D]+/,
            info: 'Allowed characters a-z, 0-9 and -'
        })
    },
    read: { type: Boolean, default: false }
});

export const BookModel = mongoose.model('books', BookSchema);

export type BookType = typeof BookModel;

export default BookModel;
