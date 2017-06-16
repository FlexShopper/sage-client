'use strict';

const expect = require('chai').expect;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const parseResponse = require('../lib/utils/parse-response');

describe('parseResponse helper method', () => {

    it('should parse a response properly', done => {
        const expected = {
            transactionId: '6c46996dc95149ebaa4fcdcd5eb0ecf1',
            approved: true,
            confirmationNumber: 'AUTH NUM 272-172'
        };

        getSampleResponse()
            .then(parseResponse)
            .then(actual => {
                expect(actual).to.deep.equal(expected);
                done();
            });
    });

});

function getSampleResponse () {
    const path = __dirname + '/sample-response.xml';
    return fs.readFileAsync(path, 'utf8');
}
