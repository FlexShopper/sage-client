'use strict';

const xml2js = require('xml2js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = {
    /**
     * Fetch a template with the name given
     * @param templateName
     * @returns {*}
     */
    getTemplate (templateName) {
        const path = `${__dirname}/../templates/${templateName}.mustache`;
        return fs.readFileAsync(path, 'utf8');
    },

    /**
     * Converts an xml string into a js object
     * @param xmlString
     */
    parseXml (xmlString) {
        const promise = (resolve, reject) => {
            xml2js.parseString(xmlString, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        };

        return new Promise(promise);
    },

    /**
     * Returns the node value in a object for a given path
     * @param node
     * @param pathString
     * @returns {*}
     */
    pathFrom (node, pathString) {
        let current = node;
        const steps = pathString.split('/');

        for (let step of steps) {
            let childFound;

            for (let child in current) {
                if (step === child) {
                    childFound = current[step];

                    const isAnArray = Array.isArray(childFound);
                    if (isAnArray) {
                        childFound = childFound[0];
                    }
                }
            }

            if (!childFound) {
                return undefined;
            }

            current = childFound;
        }

        return current;
    }

};
