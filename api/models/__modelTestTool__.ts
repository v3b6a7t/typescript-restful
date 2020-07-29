import { ModelType } from '../router/interfaces/types'
import { expect } from 'chai';
import 'mocha';


export default <M extends ModelType>(Model: M): void => {

    describe('MODELS TESTING', () => {
        describe(`Model "${Model.modelName}" testing with method save() and empty data`, () => {
            it('expects the Document to report that required properties are missing', (done) => {
                const model = new Model({});
                model.save()
                    .catch((err: Error) => {
                        const test = /([\w]+)(?=`)/g;
                        const mached = err.message.match(test);
                        if (mached) {
                            const result = Object.keys(model.schema.obj)
                                .filter(key => !!model.schema.obj[key].required)
                                .reduce((succ, curr) => succ && !!mached.includes(curr), true)
                            expect(result).to.equal(true);
                            done()
                        }
                    })
            })
        })
    })

}
