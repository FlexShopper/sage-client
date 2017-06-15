'use strict';

const renderer = require('mustache');
const helper = require('./utils/helper');
const SageRequest = require('./request');

const URL_DEMO = 'http://demo.eftchecks.com/webservices/authgateway.asmx';

class SageTerminalClient
{
    constructor ({ username, password, terminalId, identifier, sandbox = true }) {
        this.terminalId = terminalId;
        this.identifier = identifier;

        if (!sandbox) {
            // TODO define production uri
            throw new Error('A production host has not been defined');
        }

        const options = {
            username,
            password,
            renderer,
            uri: URL_DEMO,
            request: require('request-promise')
        };

        this.request = new SageRequest(options);
    }

    purchaseWithACH ({ transactionId, amount, routingNumber, accountNumber, accountType, customerData }) {
        const context = {
            amount,
            transactionId,
            routingNumber,
            accountNumber,
            accountType,
            terminalId: this.terminalId,
            identifier: this.identifier,
            customer: customerData
        };

        return helper.getTemplate('process-single-certification-check')
            .then(template => {
                const params = {
                    terminalId: this.terminalId,
                    dataPacket: renderer.render(template, context)
                };

                return this.request.processSingleCertificationCheck(params);
            });
    }
}

module.exports = SageTerminalClient;
