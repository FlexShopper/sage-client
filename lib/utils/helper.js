'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = {
    getTemplate (templateName) {
        const path = `${__dirname}/../templates/${templateName}.mustache`;
        return fs.readFileAsync(path, 'utf8');
    }
};
