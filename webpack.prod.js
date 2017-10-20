var merge = require('webpack-merge')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var common = require('./webpack.common.js')
var Webpack = require('webpack')

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    comparisons: false, // https://github.com/mapbox/mapbox-gl-js/issues/4359
                }
            }
        }),
    ],
})
