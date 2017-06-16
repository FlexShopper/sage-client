'use strict';

const Joi = require('joi');
const helper = require('./utils/helper');
const parseResponse = require('./utils/parse-response');
const SageActionType = require('./utils/sage-action-type');

class SageRequest
{
    /**
     * Create a new request instance
     * @param options.username
     * @param options.password
     * @param options.uri
     * @param options.request
     * @param options.renderer
     */
    constructor (options) {
        checkArgs(options);

        this.opts = options;
        this.headers = {
            'Content-Type': 'text/xml; charset=utf-8'
        };
    }

    processSingleCertificationCheck ({ terminalId = '2310', dataPacket }) {
        const templateName ='check-no-verification-dl-with-token-optional';

        return helper.getTemplate(templateName)
            .then(template => {
                const context = {
                    username: this.opts.username,
                    password: this.opts.password,
                    terminalId: terminalId,
                    dataPacket: dataPacket
                };

                return this.opts.renderer.render(template, context);
            })
            .then(payload => {
                const options = {
                    uri: this.opts.uri,
                    headers: Object.assign(this.headers, { SOAPAction: SageActionType.SINGLE_CERTIFICATION_CHECK }),
                    body: payload
                };

                return this.opts.request.post(options);
            })
            .then(parseResponse);
    }
}

function checkArgs (options) {
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        uri: Joi.string().uri().required(),
        renderer: Joi.required(),
        request: Joi.required()
    }).required();

    const result = Joi.validate(options, schema);
    if (result.error) {
        throw new Error(result.error);
    }
}

module.exports = SageRequest;
