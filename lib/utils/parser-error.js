'use strict';

class ParserError extends Error
{
    constructor (message) {
        super(message);
    }
}

module.exports = ParserError;
