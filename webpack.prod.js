var merge = require('webpack-merge')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var common = require('./webpack.common.js')
var Webpack = require('webpack')

module.exports = merge(common, {
    devtool: 'source-map',
    module: {
        noParse: /(mapbox-gl)\.js$/,  // https://github.com/mapbox/mapbox-gl-js/issues/4359
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
        }),
        new UglifyJSPlugin({
            sourceMap: true,
        }),
    ],
})
