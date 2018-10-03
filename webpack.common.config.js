var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
const { googleAnalyticsId } = require('./client/services/analytics/config.json');

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
            'object-assign': 'core-js/fn/object/assign.js',
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/index.tpl.html'),
            templateParameters:{
                googleAnalyticsId,
                googleAnalyticsFilename: process.env.NODE_ENV === 'production' ? 'analytics.js' : 'analytics_debug.js',
            },
        }),
    ],
}
