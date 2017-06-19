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
                const details = path(response, 'VALIDATION_MESSAGE/VALIDATION_ERROR/MESSAGE') || '';
                throw new ParserError('Message validation failed. ' + details);
            }

            const body = path(response, 'AUTHORIZATION_MESSAGE');
            let output = {
                transactionId: path(body, 'TRANSACTION_ID'),
                approved: path(body, 'RESPONSE_TYPE') === 'A',
                message: path(body, 'MESSAGE')
            };

            if (output.approved) {
                output.authorizationNumber = path(body, 'CODE');
            }

            return output;
        })
        .catch(ParserError, err => {
            return { error: err.message };
        });
}

module.exports = parseResponse;
