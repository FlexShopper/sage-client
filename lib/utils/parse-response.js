'use strict';

const helper = require('./helper.js');
const ParserError = require('./parser-error');

function parseResponse (response) {
    const path = helper.pathFrom;

    return helper.parseXml(response)
        .then(result => {
            const body = path(result, 'soap:Envelope/soap:Body/' +
                'ProcessSingleCertificationCheckResponse/ProcessSingleCertificationCheckResult');

            if (!body) {
                throw new ParserError('UnknownResponse');
            }

            return helper.parseXml(body);
        })
        .then(result => {
            const response = path(result, 'RESPONSE');
            const hasException = path(response, 'EXCEPTION');

            if (hasException) {
                throw new ParserError(path(response, 'EXCEPTION/MESSAGE'));
            }

            const validMessage = path(response, 'VALIDATION_MESSAGE/RESULT') === 'Passed';
            if (!validMessage) {
                throw new ParserError('Message validation failed');
            }

            const body = path(response, 'AUTHORIZATION_MESSAGE');
            return {
                transactionId: path(body, 'TRANSACTION_ID'),
                approved: path(body, 'RESPONSE_TYPE_TEXT') === 'APPROVED',
                confirmationNumber: path(body, 'CODE')
            };
        })
        .catch(ParserError, err => {
            return { error: err.message };
        });
}

module.exports = parseResponse;
