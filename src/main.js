'use strict';

const functions = require('./functions');

/**
 * Get password strength score from 0 to 100
 * @param {string} pwd
 */
function getPasswordStrength(pwd) {
    if (!pwd) {
        return 0;
    }

    const list = pwd.split('');
    const score = Object.values(functions).reduce((total, fn) => {
        total += fn(list);
        return total;
    }, 0);

    return Math.max(0, Math.min(100, score));
}

module.exports = getPasswordStrength;
