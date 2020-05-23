import Book from './bookModel';
import { expect } from 'chai';
import 'mocha';

describe('MODELS TESTING', () =>{
    describe('Model bookModel testing with method `save()` and empty data', ()=> {
        it('expects the Document to report that required properties are missing', (done) => {
            const book = new Book({});
            book.save()
                .catch((err: Error) => {
                    const re = /([\w]+)(?=`)/g;
                    const mached = err.message.match(re);
                    if(mached) {
                        const result = Object.keys(book.schema.obj)
                                .filter(key => !!book.schema.obj[key].required)
                                .reduce((succ, curr) => succ && !!mached.includes(curr), true)
                        expect(result).to.equal(true);
                        done()
                    }
                })
        })
    })
})
