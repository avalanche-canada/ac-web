var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('es6-promise')

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'client/src/index.js'),
		vendor: ['babel-polyfill', 'react', 'react-dom', 'recompose', 'react-css-modules', 'keycode', 'moment', 'lodash', 'lodash.padstart', 'lodash.memoize', 'lodash.range'],
	},
	output: {
		path: path.resolve(__dirname, 'client/build'),
        // publicPath: 'http://localhost:9000/build/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
		}, {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            loader: 'file'
		}, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192'
		}, {
            test: /\.json$/,
            loader: 'json'
        }]
	},
	postcss: [
		require('postcss-import'),
		require('postcss-cssnext')
	],
	devtool: 'sourcemap',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
	],
    stats: {
        errorDetails: true
    }
}
