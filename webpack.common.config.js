var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'client/index.js'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/',
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'client')],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/index.tpl.html'),
        }),
    ],
}
