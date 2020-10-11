//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
    entry: './src/client/index',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'dist.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/index.html'
        }),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            eslint: {
                files: "./src/**/*.tsx",
            },
        }),
    ]
};