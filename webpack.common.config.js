var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
const { googleAnalyticsId } = require('./client/services/analytics/config.json')

module.exports = {
    entry: path.resolve(__dirname, 'client/index.js'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/public/',
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'client')],
        alias: {
            // react-image-gallery
            'lodash.throttle': 'lodash/throttle',
            'lodash.debounce': 'lodash/debounce',
            // npm list --prod | grep "lodash\(\.\|-es\|-amd\)" | grep -v "deduped"
            'lodash.once': 'lodash/once',
            'lodash.set': 'lodash/set',
            // @reach/router
            'create-react-context': path.resolve(
                __dirname,
                'client/vendor/create-react-context/shim.js'
            ),
            // Creates an issue when used. This could be enabled back once auth0-lock will move newer React
            // 'react-lifecycles-compat': path.resolve(__dirname, 'client/vendor/react-lifecycles-compat/shim.js'),
            'object-assign': 'core-js/features/object/assign.js',
        },
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            REACT_APP_SHOW_NOT_PRODUCTION_WARNING: false,
            REACT_APP_AVCAN_API_URL_LEGACY: 'https://dev.avalanche.ca/api',
            REACT_APP_STATIC_URL: 'https://dev.avalanche.ca/api/static',
            REACT_APP_AVCAN_API_URL: 'https://api.avalanche.ca',
            REACT_APP_AST_API_URL: 'https://ast.avalanche.ca/api',
            REACT_APP_WEATHER_API_URL: 'https://api.avalanche.ca/weather',
            REACT_APP_INCIDENTS_API_URL: 'https://incidents.avalanche.ca',
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/index.tpl.html'),
            templateParameters: {
                googleAnalyticsId,
                googleAnalyticsFilename:
                    process.env.NODE_ENV === 'production' ? 'analytics.js' : 'analytics_debug.js',
            },
        }),
    ],
}
