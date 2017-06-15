'use strict';

const expect = require('chai').expect;
const SageClient = require('../lib/client');

describe('SageClient', () => {
    const options = {
        username: 'username',
        password: 'password',
        terminalId: 'terminalId',
        identifier: 'identifier'
    };

    const client = new SageClient(options);

    it('should create a new instance of the SageClient class', done => {
        expect(client).to.be.a('object');
        done();
    });

});
