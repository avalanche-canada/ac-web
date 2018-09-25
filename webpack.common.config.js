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
        alias: {
            // react-image-gallery
            'lodash.throttle': 'lodash/throttle',
            'lodash.debounce': 'lodash/debounce',
            // @reach/router
            'create-react-context': path.resolve(__dirname, 'client/vendor/create-react-context/shim.js'),
            'react-lifecycles-compat': path.resolve(__dirname, 'client/vendor/react-lifecycles-compat/shim.js'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/index.tpl.html'),
        }),
    ],
}
