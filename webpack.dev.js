var merge = require('webpack-merge')
var common = require('./webpack.common.js')
var Webpack = require('webpack')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist/public',
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
        }),

    ]
})
