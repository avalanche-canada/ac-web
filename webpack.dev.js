var merge = require('webpack-merge')
var common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist/public',
    },
})
