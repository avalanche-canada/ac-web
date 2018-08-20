var path = require('path')
var Webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var prod = require('./webpack.prod.js')

module.exports = Object.assign({}, prod, {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    entry: {
        forecast: path.resolve(
            __dirname,
            'client/layouts/products/forecast/index.js'
        ),
        transformers: path.resolve(__dirname, 'client/api/transformers.js'),
        configure: path.resolve(__dirname, 'client/store/configure/prod.js'),
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new Webpack.NamedModulesPlugin(),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),
    ],
})
