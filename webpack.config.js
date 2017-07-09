module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'password-meter.js',
        library: 'getPasswordStrength'
    },
    plugins: [
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