module.exports = {
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "plugins": ["compat"],
    "extends": "eslint:recommended",
    "globals": {},
    "rules": {
        "indent": ["error",
            4, {
                SwitchCase: 1
            }],
        "semi": ["error",
            "always"
        ],
        "max-len": ["warn", {
            code: 80,
            tabWidth: 2,
            ignoreUrls: true
        }],
        "no-var": ["warn"],
        "no-console": ["warn", {
            allow: ["warn", "error"]
        }],
        "compat/compat": 2
    },
};
