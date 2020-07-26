import mongoose, { Schema, Document } from 'mongoose';
import stringValidator from './validator/stringValidator'
import mongooseAutopopulate from 'mongoose-autopopulate';


export interface BookInterface extends Document {
    title: string;
    author: Array<Schema.Types.ObjectId>;
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
    author: [{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        autopopulate: true
    }],
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



BookSchema.plugin(mongooseAutopopulate)



export const BookModel = mongoose.model<BookInterface & Document>('Books', BookSchema);

export type BookType = typeof BookModel;

export default BookModel;
