var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

var CommonsChunkPlugin       = webpack.optimize.CommonsChunkPlugin
var UglifyJsPlugin           = webpack.optimize.UglifyJsPlugin
var OccurrenceOrderPlugin    = webpack.optimize.OccurrenceOrderPlugin
var DedupePlugin             = webpack.optimize.DedupePlugin
var DefinePlugin             = webpack.DefinePlugin
var ContextReplacementPlugin = webpack.ContextReplacementPlugin

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'client/src/main.js'),
	},
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist', 'public'),
        filename: '[name].js',
	},
    devtool: 'source-map',
    module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
            test: /\.js$/,
            include: path.resolve(__dirname, 'node_modules/mapbox-gl/js/render/painter/use_program.js'),
            loader: 'transform/cacheable?brfs'
        }, {
            test: /\.css/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
        }, {
            test: /\.css/,
            include: /node_modules/,
            loaders: ['style', 'css']
		}, {
            test: /\.(eot|woff|woff2|ttf)$/,
            loader: 'file'
		}, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192'
		}, {
            test: /\.svg$/,
            loader: 'file'
		}, {
            test: /\.json$/,
            loader: 'json'
        }],
        postLoaders: [{
            include: /node_modules\/mapbox-gl/,
            loader: 'transform',
            query: 'brfs'
        }]
	},
    resolve: {
        root: [
            path.resolve('./client/src'),
            path.resolve('./node_modules')
        ],
        alias: {
            constants: 'constants',
            styles: 'styles',
            assets: 'assets',
            components: 'components',
            compose: 'compose',
            containers: 'containers',
            layouts: 'layouts',
            prismic: 'prismic',
            webworkify: 'webworkify-webpack',
            reducers: 'reducers',
            router: 'router',
            store: 'store',
            middleware: 'middleware',
            api: 'api',
            selectors: 'selectors',
            utils: 'utils',
        }
    },
    postcss: [
        require('postcss-import'),
		require('postcss-cssnext'),
        require('rucksack-css'),
	],
	plugins: [
        new CaseSensitivePathsPlugin(),
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
        }),
		new ExtractTextPlugin('style.css', { allChunks: true }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/src/index.tpl.html'),
            inject: 'body',
            filename: 'index.html',
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new UglifyJsPlugin(),
        new OccurrenceOrderPlugin(),
        new DedupePlugin(),
	]
}
