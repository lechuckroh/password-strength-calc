'use strict';

const alphaRe = /[a-zA-Z]/;
const uppercaseRe = /[A-Z]/;
const lowercaseRe = /[a-z]/;
const numericRe = /[0-9]/;
const symbolRe = /[^a-zA-Z0-9]/;
const numericSymbolRe = /[^a-zA-Z]/;

const charList = s => Array.isArray(s) ? s : s.split('');
const toString = s => Array.isArray(s) ? s.join('') : s;
const isAlpha = ch => alphaRe.test(ch);
const isUppercase = ch => uppercaseRe.test(ch);
const isLowercase = ch => lowercaseRe.test(ch);
const isNumeric = ch => numericRe.test(ch);
const isSymbol = ch => symbolRe.test(ch);
const isNumericSymbol = ch => numericSymbolRe.test(ch);

const numberSeq = '01234567890';
const alphaSeq = 'abcdefghijklmnopqrstuvwxyz';
const symbolSeq = '~!@#$%^&*()_+{}|<>?,./';

const functions = {
    calcNumberOfChars: function (pwd) {
        return pwd.length * 4;
    },

    /**
     * Check count of uppercase character.
     * non-uppercase character required to get score.
     */
    calcUppercaseLetters: function (pwd) {
        const count = charList(pwd).reduce((count, ch) => {
            return isUppercase(ch) ? count + 1 : count;
        }, 0);
        const length = pwd.length;
        return (count && count < length) ? (length - count) * 2 : 0;
    },

    /**
     * Check count of lowercase character.
     * non-lowercase character required to get score.
     */
    calcLowercaseLetters: function (pwd) {
        const count = charList(pwd).reduce((count, ch) => {
            return isLowercase(ch) ? count + 1 : count;
        }, 0);
        const length = pwd.length;
        return (count && count < length) ? (length - count) * 2 : 0;
    },

    /**
     * Check count of numbers.
     * non-numeric character required to get score.
     */
    calcNumbers: function (pwd) {
        const count = charList(pwd).reduce((count, ch) => {
            return isNumeric(ch) ? count + 1 : count;
        }, 0);
        const length = pwd.length;
        return (count < length) ? count * 4 : 0;
    },

    /** Check count of symbols. */
    calcSymbols: function (pwd) {
        const count = charList(pwd).reduce((count, ch) => {
            return isSymbol(ch) ? count + 1 : count;
        }, 0);
        return count * 6;
    },

    /** Check count of numbers & symbols in the middle of string */
    calcMiddleNumbersOrSymbols: function (pwd) {
        const list = charList(pwd).slice(1, pwd.length - 1);
        const count = list.reduce((count, ch) => {
            return isNumericSymbol(ch) ? count + 1 : count;
        }, 0);
        return count * 2;
    },

    /**
     * Check minimum requirements.
     * * Minimum 8 characters in length
     * * Contains 3/4 of the following items:
     *   - Uppercase Letters
     *   - Lowercase Letters
     *   - Numbers
     *   - Symbols
     */
    calcRequirements: function (pwd) {
        let hasLowerCase = false;
        let hasUpperCase = false;
        let hasNumber = false;
        let hasSymbol = false;
        charList(pwd).forEach(ch => {
            if (isLowercase(ch)) {
                hasLowerCase = true;
            } else if (isUppercase(ch)) {
                hasUpperCase = true;
            } else if (isNumeric(ch)) {
                hasNumber = true;
            } else if (isSymbol(ch)) {
                hasSymbol = true;
            }
        });

        const req1 = (pwd.length >= 8) ? 1 : 0;
        const req2a = hasLowerCase ? 1 : 0;
        const req2b = hasUpperCase ? 1 : 0;
        const req2c = hasNumber ? 1 : 0;
        const req2d = hasSymbol ? 1 : 0;

        const req2sum = req2a + req2b + req2c + req2d;
        if (req1 && (req2sum >= 3)) {
            return (req1 + req2sum) * 2;
        } else {
            return 0;
        }
    },

    /** Check if every character is a letter */
    calcLettersOnly: function (pwd) {
        return charList(pwd).every(ch => isAlpha(ch)) ? -pwd.length : 0;
    },

    /** Check if every character is numeric */
    calcNumbersOnly: function (pwd) {
        return charList(pwd).every(ch => isNumeric(ch)) ? -pwd.length : 0;
    },

    /**
     * Calculate deduction based on proximity to identical characters
     * Deduction is incremented each time a new match is discovered
     * Deduction amount is based on total password length divided by the
     * difference of distance between currently selected match
     */
    calcRepeatChars: function (pwd) {
        const list = charList(pwd);
        const length = pwd.length;

        let repeatedCharCount = 0;
        const score = list.reduce((total, c1, i1) => {
            let inc = 0;

            list.forEach((c2, i2) => {
                if (i1 !== i2 && c1 === c2) {
                    inc += Math.abs(length / (i2 - i1));
                }
            });

            if (inc > 0) {
                repeatedCharCount++;
                const uniqueCharCount = length - repeatedCharCount;
                total = uniqueCharCount ?
                    Math.ceil((total + inc) / uniqueCharCount) :
                    Math.ceil(total + inc);
            }

            return total;
        }, 0);

        return -score;
    },

    /** Check for consecutive uppercase character */
    calcConsecutiveUppercase: function (pwd) {
        const list = charList(pwd);
        const length = list.length;
        const count = list.reduce((count, ch, idx, arr) => {
            if (idx < length - 1) {
                if (isUppercase(ch) && isUppercase(arr[idx + 1])) {
                    count++;
                }
            }
            return count;
        }, 0);
        return -count * 2;
    },

    /** Check for consecutive lowercase character */
    calcConsecutiveLowercase: function (pwd) {
        const list = charList(pwd);
        const length = list.length;
        const count = list.reduce((count, ch, idx, arr) => {
            if (idx < length - 1) {
                if (isLowercase(ch) && isLowercase(arr[idx + 1])) {
                    count++;
                }
            }
            return count;
        }, 0);
        return -count * 2;
    },

    /** Check for consecutive numeric character */
    calcConsecutiveNumber: function (pwd) {
        const list = charList(pwd);
        const length = list.length;
        const count = list.reduce((count, ch, idx, arr) => {
            if (idx < length - 1) {
                if (isNumeric(ch) && isNumeric(arr[idx + 1])) {
                    count++;
                }
            }
            return count;
        }, 0);
        return -count * 2;
    },

    /** Check for sequential alpha string pattern (forward and backward) */
    calcSequentialLetters: function (pwd) {
        let count = 0;
        const maxIdx = alphaSeq.length - 3;
        const str = toString(pwd).toLowerCase();
        for (let i = 0; i <= maxIdx; i++) {
            const fwd = alphaSeq.substring(i, i + 3);
            const bwd = fwd.split('').reverse().join('');
            if (str.includes(fwd) || str.includes(bwd)) {
                count++;
            }
        }
        return -count * 3;
    },


    /** Check for sequential numeric string pattern (forward and backward) */
    calcSequentialNumbers: function (pwd) {
        let count = 0;
        const maxIdx = numberSeq.length - 3;
        const str = toString(pwd);
        for (let i = 0; i <= maxIdx; i++) {
            const fwd = numberSeq.substring(i, i + 3);
            const bwd = fwd.split('').reverse().join('');
            if (str.includes(fwd) || str.includes(bwd)) {
                count++;
            }
        }
        return -count * 3;
    },

    /** Check for sequential symbol string pattern (forward and backward) */
    calcSequentialSymbols: function (pwd) {
        let count = 0;
        const maxIdx = symbolSeq.length - 3;
        const str = toString(pwd);
        for (let i = 0; i <= maxIdx; i++) {
            const fwd = symbolSeq.substring(i, i + 3);
            const bwd = fwd.split('').reverse().join('');
            if (str.includes(fwd) || str.includes(bwd)) {
                count++;
            }
        }
        return -count * 3;
    }
};

module.exports = functions;
