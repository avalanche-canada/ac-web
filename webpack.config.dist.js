var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('es6-promise')

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'client/src/index.js'),
		vendor: ['react', 'react-dom', 'recompose', 'react-css-modules', 'keycode', 'moment', 'lodash', 'lodash.padstart'],
	},
	output: {
		path: path.resolve(__dirname, 'client/build'),
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
            test: /\.(jpg|svg|eot|woff|woff2|ttf)$/,
            loader: 'file'
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
            'process.env.NODE_ENV': JSON.stringify('production')
        })
	]
}
