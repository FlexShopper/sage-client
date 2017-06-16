'use strict';

const expect = require('chai').expect;
const helper = require('../lib/utils/helper');

describe('Sage client helper', () => {
    it('should fetch check-no-verification-dl-with-token-optional template successfully', done => {
        const templateName ='check-no-verification-dl-with-token-optional';

        helper.getTemplate(templateName).then(result => {
            expect(result).to.be.an('string');
        });

        done();
    });

    it('should fetch check-no-verification-dl-with-token-optional template successfully', done => {
        const templateName = 'process-single-certification-check';

        helper.getTemplate(templateName).then(result => {
            expect(result).to.be.an('string');
        });

        done();
    });

    it('should returns Passed value from an object with path VALIDATION_MESSAGE/RESULT', done => {
        const response = {
            VALIDATION_MESSAGE: [{
                RESULT: ['Passed']
            }],
        };

        expect(helper.pathFrom(response, 'VALIDATION_MESSAGE/RESULT')).to.equal('Passed');
        done();
    });

});
