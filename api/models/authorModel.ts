import mongoose, { Schema, Document } from 'mongoose';
import stringValidator from './validator/stringValidator'
import mongooseAutopopulate from 'mongoose-autopopulate';

export interface AuthorInterface extends Document {
    name: string;
    lastname: string;
    book: Array<Schema.Types.ObjectId>;
}

export const AuthorSchema = new Schema<AuthorInterface>({
    name: {
        type: String,
        required: true,
        validate: stringValidator({
            min: 3,
            max: 25,
            match: /^((\p{Lu}\.|\p{Lu}[\p{Ll}\x2D]+)\s?){1,3}$/gu,
            info: "Enter one or two first names"
        })
    },
    lastname: {
        type: String,
        required: true,
        validate: stringValidator({
            min: 3,
            max: 25,
            match: /^(\p{Lu}[\p{Ll}\x20\x2D]+){1,2}$/gu,
            info: "Enter last name"
        })
    },
    book: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        autopopulate: { maxDepth: 1 }
    }]
});


AuthorSchema.plugin(mongooseAutopopulate);


export const AuthorModel = mongoose.model<AuthorInterface & Document>('Author', AuthorSchema);

export type BookType = typeof AuthorModel;

export default AuthorModel;
