const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'dist/password-meter.min.js',
        library: 'getPasswordStrength'
    },
    plugins: [
        new BabiliPlugin({})
    ],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
        }],
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            query: {
                presets: ['es2015']
            }
        }]
    }
};