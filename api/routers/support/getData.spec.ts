import Book, { BookType } from '../../models/bookModel';
import getData from './getData';
import { expect } from 'chai'
import 'mocha';

describe('Function getData() testing', () => {

    const data = {
        title: 'This property has to be preserved',
        toThrowAway: 'This property has to be thrown away'
    };
    const proc = getData<typeof data, BookType>(data, Book, true);

    it('the invalid data property has been removed', () => {
        expect('toThrowAway' in proc).to.equal(false);
    });

    it('the correct data property has been preserved', () => {
        expect('title' in proc).to.equal(true);
    });

    it('missing data properties has been added', () => {  
        expect(Object.keys(Book.schema.obj).reduce((succ, curr) => succ && (curr in proc), true)).to.equal(true);
    });

});