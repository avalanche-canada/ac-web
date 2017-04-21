var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var CommonsChunkPlugin       = webpack.optimize.CommonsChunkPlugin
var UglifyJsPlugin           = webpack.optimize.UglifyJsPlugin
var OccurrenceOrderPlugin    = webpack.optimize.OccurrenceOrderPlugin
var DedupePlugin             = webpack.optimize.DedupePlugin
var DefinePlugin             = webpack.DefinePlugin

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'client/main.js'),
	},
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist', 'public'),
        filename: '[name].[chunkhash].js',
	},
    devtool: 'source-map',
    module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
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
	},
    resolve: {
        root: [
            path.resolve('./client'),
            path.resolve('./node_modules')
        ],
    },
    postcss: [
        require('postcss-import'),
		require('postcss-cssnext'),
        require('rucksack-css'),
	],
	plugins: [
        new WebpackMd5Hash(),
        new CaseSensitivePathsPlugin(),
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
        }),
		new ExtractTextPlugin('style.css', { allChunks: true }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/index.tpl.html'),
            filename: 'index.html',
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin(),
        new OccurrenceOrderPlugin(),
        new DedupePlugin(),
	]
}
