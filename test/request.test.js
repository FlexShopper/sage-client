'use strict';

const expect = require('chai').expect;
const SageRequest = require('../lib/request');

describe('SageRequest', () => {
    describe('Creating a SageRequest instance validations', () => {
        const options = {
            username: 'username',
            password: 'password',
            uri: 'http://uri.com',
            request: () => {}
        };

        it('should throw an error if the renderer or any other parameter is missing', done => {
            expect(() => new SageRequest(options)).to.throw('renderer');
            done();
        });
    });



    describe('Making a SingleCertificationCheck requests', () => {
        let request;
        let reqParams;
        let reqOptions;

        beforeEach(done => {
            reqOptions = {
                username: 'username',
                password: 'password',
                uri: 'http://demo.eftchecks.com/webservices/authgateway.asmx',
                request: { post: () => {} },
                renderer: require('mustache')
            };

            request = new SageRequest(reqOptions);
            reqParams = { dataPacket: 'dataPacket' };

            done();
        });

        it('should render the payload to post', done => {
            reqOptions.renderer = {
                render: (template, context) => {
                    expect(template).to.be.a('string');

                    const expectedContext = {
                        username: reqOptions.username,
                        password: reqOptions.password,
                        terminalId: '2310',
                        dataPacket: 'dataPacket'
                    };

                    expect(context).to.deep.equal(expectedContext);
                    done();
                }
            };

            request.processSingleCertificationCheck(reqParams);
        });

        it('should post a new request with SingleCertificationCheck SoapAction as header', done => {
            reqOptions.request.post = (options) => {
                const expected = 'http://tempuri.org/GETI.eMagnus.WebServices' +
                    '/AuthGateway/ProcessSingleCertificationCheck';

                expect(options.headers['SOAPAction']).to.equal(expected);
                done();
            };

            request.processSingleCertificationCheck(reqParams);
        });

        it('should post a new request with the proper terminalId in the body', done => {
            reqOptions.request.post = (options) => {
                const expected = '<aut:TerminalID>2310</aut:TerminalID>';
                expect(options.body).to.include(expected);

                done();
            };

            request.processSingleCertificationCheck(reqParams);
        });
    });

});
