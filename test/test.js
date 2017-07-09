'use strict';

const assert = require('assert');
const getPasswordStrength = require('../src/main');
const functions = require('../src/functions');

describe('test', function () {

    describe('functions', function () {
        it('calcNumberOfChars', function () {
            const fn = functions.calcNumberOfChars;
            assert.equal(fn(''), 0);
            assert.equal(fn('14'), 8);
            assert.equal(fn('abc'), 12);
        });

        it('calcUppercaseLetters', function () {
            const fn = functions.calcUppercaseLetters;
            assert.equal(fn(''), 0);
            assert.equal(fn('1'), 0);
            assert.equal(fn('AB'), 0);
            assert.equal(fn('ABa'), 2);
            assert.equal(fn('ABCDEaa'), 4);
        });

        it('calcLowercaseLetters', function () {
            const fn = functions.calcLowercaseLetters;
            assert.equal(fn(''), 0);
            assert.equal(fn('1'), 0);
            assert.equal(fn('ab'), 0);
            assert.equal(fn('ABa'), 4);
            assert.equal(fn('ABCDEaa'), 10);
        });

        it('calcNumbers', function () {
            const fn = functions.calcNumbers;
            assert.equal(fn('12'), 0);
            assert.equal(fn('a1'), 4);
            assert.equal(fn('A12'), 8);
            assert.equal(fn('1ab2cd3'), 12);
        });

        it('calcSymbols', function () {
            const fn = functions.calcSymbols;
            assert.equal(fn('+'), 6);
            assert.equal(fn('Aa1'), 0);
            assert.equal(fn('++A++'), 24);
        });

        it('calcMiddleNumbersOrSymbols', function () {
            const fn = functions.calcMiddleNumbersOrSymbols;
            assert.equal(fn('AbA'), 0);
            assert.equal(fn('1234'), 4);
            assert.equal(fn('A1@B3C+'), 6);
        });

        it('calcRequirements', function () {
            const fn = functions.calcRequirements;
            assert.equal(fn('Aa1$'), 0);
            assert.equal(fn('AAAbbb123'), 8);
            assert.equal(fn('AAbb12()'), 10);
        });

        it('calcLettersOnly', function () {
            const fn = functions.calcLettersOnly;
            assert.equal(fn('A'), -1);
            assert.equal(fn('A1'), 0);
            assert.equal(fn('A!'), 0);
            assert.equal(fn('AbCdE'), -5);
        });

        it('calcNumbersOnly', function () {
            const fn = functions.calcNumbersOnly;
            assert.equal(fn('1'), -1);
            assert.equal(fn('1A'), 0);
            assert.equal(fn('1!'), 0);
            assert.equal(fn('12345'), -5);
        });

        it('calcRepeatChars', function () {
            const fn = functions.calcRepeatChars;
            assert.equal(fn('A'), 0);
            assert.equal(fn('AA'), -4);
            assert.equal(fn('AAA'), -14);
            assert.equal(fn('AAa'), -5);
            assert.equal(fn('A1121A'), -7);
            assert.equal(fn('aAAAa'), -17);
        });

        it('calcConsecutiveUppercase', function () {
            const fn = functions.calcConsecutiveUppercase;
            assert.equal(fn('A'), 0);
            assert.equal(fn('AB'), -2);
            assert.equal(fn('AAB'), -4);
            assert.equal(fn('ABCD'), -6);
            assert.equal(fn('A1AaB'), 0);
        });

        it('calcConsecutiveLowercase', function () {
            const fn = functions.calcConsecutiveLowercase;
            assert.equal(fn('a'), 0);
            assert.equal(fn('ab'), -2);
            assert.equal(fn('aab'), -4);
            assert.equal(fn('abcd'), -6);
            assert.equal(fn('A1aAb'), 0);
        });

        it('calcConsecutiveNumber', function () {
            const fn = functions.calcConsecutiveNumber;
            assert.equal(fn('1'), 0);
            assert.equal(fn('12'), -2);
            assert.equal(fn('123'), -4);
            assert.equal(fn('1212'), -6);
            assert.equal(fn('1Ab2A'), 0);
        });

        it('calcSequentialLetters', function () {
            const fn = functions.calcSequentialLetters;
            assert.equal(fn('abc'), -3);
            assert.equal(fn('abcd'), -6);
            assert.equal(fn('zyx'), -3);
            assert.equal(fn('ABCDabc'), -6);
            assert.equal(fn('ABCDEF1ABCD'), -12);
        });

        it('calcSequentialNumbers', function () {
            const fn = functions.calcSequentialNumbers;
            assert.equal(fn('012'), -3);
            assert.equal(fn('7890'), -6);
            assert.equal(fn('098'), -3);
            assert.equal(fn('3210'), -6);
            assert.equal(fn('012345A1234'), -12);
        });

        it('calcSequentialSymbols', function () {
            const fn = functions.calcSequentialSymbols;
            assert.equal(fn('~!@'), -3);
            assert.equal(fn('()_+'), -6);
            assert.equal(fn('+_)('), -6);
            assert.equal(fn('<>?'), -3);
            assert.equal(fn('{}|'), -3);
            assert.equal(fn('A#$%^B&*()C'), -12);
        });
    });


    describe('password score', function () {
        const testSet = {
            '': 0,
            'a': 3,
            '1': 3,
            '321': 4,
            'Aa': 10,
            'AA': 0,
            'PassW0rd!': 72
        };

        Object.entries(testSet).forEach(e => {
            const [password, score] = e;
            it(`strength of '${password}' === ${score}`, function () {
                assert.equal(getPasswordStrength(password), score);
            });
        });
    });
});
