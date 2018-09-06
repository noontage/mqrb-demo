const webpack = require('webpack');
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

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
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015'
                        ],
                    },
                }
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
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
    plugins: [
        new MonacoWebpackPlugin()
    ]
}