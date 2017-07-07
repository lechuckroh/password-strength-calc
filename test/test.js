'use strict';

const assert = require('assert');
const { getPasswordStrength, functions } = require('../index');

describe('test', function () {

    describe('functions', function () {
        it('calcNumberOfChars', function () {
            assert.equal(functions.calcNumberOfChars(''), 0);
            assert.equal(functions.calcNumberOfChars('14'), 8);
            assert.equal(functions.calcNumberOfChars('abc'), 12);
        });

        it('calcUppercaseLetters', function() {
            assert.equal(functions.calcUppercaseLetters(''), 0);
            assert.equal(functions.calcUppercaseLetters('AB'), 0);
            assert.equal(functions.calcUppercaseLetters('ABa'), 2);
            assert.equal(functions.calcUppercaseLetters('ABCDEaa'), 4);
        });

        it('calcLowercaseLetters', function() {
            assert.equal(functions.calcLowercaseLetters(''), 0);
            assert.equal(functions.calcLowercaseLetters('ab'), 0);
            assert.equal(functions.calcLowercaseLetters('ABa'), 4);
            assert.equal(functions.calcLowercaseLetters('ABCDEaa'), 10);
        });

        it('calcNumbers', function() {
            assert.equal(functions.calcNumbers('12'), 0);
            assert.equal(functions.calcNumbers('a1'), 4);
            assert.equal(functions.calcNumbers('A12'), 8);
            assert.equal(functions.calcNumbers('1ab2cd3'), 12);
        });

        it('calcSymbols', function() {
            assert.equal(functions.calcSymbols('+'), 6);
            assert.equal(functions.calcSymbols('Aa1'), 0);
            assert.equal(functions.calcSymbols('++A++'), 24);
        });
    });



    describe('password score', function () {
        const testSet = {
            // '': 0,
            // 'a': 3,
            // '1': 3,
            // '321': 4,
            // 'Aa': 10,
            // 'AA': 0,
            // 'PassW0rd!': 72
        };

        Object.entries(testSet).forEach(e => {
            const [password, score] = e;
            it(`'${password}' should be ${score}`, function () {
                assert.equal(getPasswordStrength(password), score);
            });
        });
    });
});
