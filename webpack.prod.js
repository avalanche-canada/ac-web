var merge = require('webpack-merge')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var common = require('./webpack.common.js')
var Webpack = require('webpack')

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
        }),
        new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    reduce_vars: false, // fix issue with minified victory lib. Issue with uglifyjs https://github.com/mishoo/UglifyJS2/issues/2531
                }
            },
        }),
    ],
})
