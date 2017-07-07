'use strict';

const charList = s => s.split('');

const functions = {
    calcNumberOfChars: function (password) {
        return password.length * 4;
    },

    /**
     * Check count of uppercase character.
     * non-uppercase character required to get score.
     */
    calcUppercaseLetters: function (password) {
        const count = charList(password).reduce((count, ch) => {
            return count + (ch.match(/[A-Z]/g) ? 1 : 0);
        }, 0);
        const length = password.length;
        return (count < length) ? (length - count) * 2 : 0;
    },

    /**
     * Check count of lowercase character.
     * non-lowercase character required to get score.
     */
    calcLowercaseLetters: function (password) {
        const count = charList(password).reduce((count, ch) => {
            return count + (ch.match(/[a-z]/g) ? 1 : 0);
        }, 0);
        const length = password.length;
        return (count < length) ? (length - count) * 2 : 0;
    },

    /**
     * Check count of numbers.
     * non-numeric character required to get score.
     */
    calcNumbers: function (password) {
        const count = charList(password).reduce((count, ch) => {
            return count + (ch.match(/[0-9]/g) ? 1 : 0);
        }, 0);
        const length = password.length;
        return (count < length) ? count * 4 : 0;
    },

    /** Check count of symbols. */
    calcSymbols: function (password) {
        const count = charList(password).reduce((count, ch) => {
            if (ch.match(/[^a-zA-Z0-9]/g)) {
                count++;
            }
            return count;
        }, 0);
        return count * 6;
    },

    calcMiddleNumbersOrSymbols: function (password) {
        // TODO:
        return 0;
    },

    calcRequirements: function (password) {
        // TODO
        return 0;
    },

    calcLettersOnly: function (password) {
        // TODO
        return 0;
    },

    calcNumbersOnly: function (password) {
        // TODO
        return 0;
    },

    calcRepeatChars: function (password) {
        // TODO
        return 0;
    },

    calcConsecutiveUppercase: function (password) {
        // TODO
        return 0;
    },

    calcConsecutiveLowercase: function (password) {
        // TODO
        return 0;
    },

    calcConsecutiveNumber: function (password) {
        // TODO
        return 0;
    },

    calcSequentialLetters: function (password) {
        // TODO
        return 0;
    },

    calcSequentialNumbers: function (password) {
        const numericStr = '01234567890';
        let count = 0;
        for (let i = 0; i < 8; i++) {
            const fwd = numericStr.substring(i, i + 3);
            const bwd = fwd.split('').reverse().join('');
            if (password.includes(fwd, bwd)) {
                console.log('contains', fwd, bwd);
                count++;
            }
        }
        console.log(-count * 3);
        return - count * 3;
    },

    calcSequentialSymbols: function (password) {
        // TODO
        return 0;
    }
};

/**
 * Get password strength score from 0 to 100
 * @param {string} password 
 */
function getPasswordStrength(password) {
    if (!password) {
        return 0;
    }

    const score = functions.reduce((total, fn) => {
        total += fn(password);
        return total;
    }, 0);
    return Math.max(0, Math.min(100, score));
}

exports.functions = functions;
exports.getPasswordStrength = getPasswordStrength;
