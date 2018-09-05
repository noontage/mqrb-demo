const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'production.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        'es2015'
                    ],
                },
            }],
        }],
    },
    resolve: {
        alias: {}
    },
    node: {
        fs: "empty"
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        port: 3999,
    },
    plugins: []
}