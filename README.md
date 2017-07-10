# password-strength-calc

[![Build Status](https://travis-ci.org/lechuckroh/password-strength-calc.svg?branch=master)](https://travis-ci.org/lechuckroh/password-strength-calc)
[![Coverage Status](https://coveralls.io/repos/github/lechuckroh/password-strength-calc/badge.svg?branch=master)](https://coveralls.io/github/lechuckroh/password-strength-calc?branch=master)

Password strength calculator written in JavaScript.

Scoring rule is based on [The Password Meter](http://www.passwordmeter.com).

Password strength value is from 0 to 100.

## Node.js
```javascript
const getPasswordStrength = require('password-strength-calc');

console.log(`'Password' strength is ${getPasswordStrength('Password')}`);

// 'Password' strength is 26
```

## Browser
```javascript
<script src="pwd-str-calc.min.js"></script>
<script>
    document.write("'Password' strength is " + getPasswordStrength('Password'));
</script>
```
