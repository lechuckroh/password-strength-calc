# password-strength-calc
Password strength calculator written in JavaScript.

Scoring rule is based on [The Password Meter](http://www.passwordmeter.com).

Password strength value is from 0 to 100.

## Node.js
```javascript
const getPasswordStrength = require('password-strength-calc');

console.log(`'Password' strength is ${getPasswordStrength('Password')}`);
```

## Browser
```javascript
<script src="pwd-str-calc.min.js"></script>
<script>
    document.write("'Password' strength is " + getPasswordStrength('Password'));
</script>
```
