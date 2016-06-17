var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

require('es6-promise')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
var DefinePlugin = webpack.DefinePlugin
var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin

module.exports = {
	entry: {
		// old: path.resolve(__dirname, 'client/src/index.js'),
		// app: path.resolve(__dirname, 'client/src/index.js'),
		vendor: ['babel-polyfill', 'react', 'react-dom', 'recompose', 'react-css-modules', 'keycode', 'moment', 'lodash', 'lodash.padstart', 'lodash.memoize', 'lodash.range'],
        app: path.resolve(__dirname, 'client/src/mount.js'),
	},
	output: {
        publicPath: '/',
        path: path.join(__dirname, 'client/build'),
        filename: '[name].bundle.js',
	},
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
            components: 'components',
            compose: 'compose',
            pages: 'pages',
            router: 'router',
            containers: 'containers',
            mapboxgl: 'mapboxgl',
            prismic: 'prismic',
            webworkify: 'webworkify-webpack',
        }
    },
	postcss: [
		require('postcss-import'),
		require('postcss-cssnext'),
        require('rucksack-css'),
	],
    devServer: {
        devtool: 'sourcemap',
        progress: true,
        colors: true,
        hot: true,
        contentBase: 'client/build',
        historyApiFallback: true,
        // proxy: {
        //     '/api*': {
        //         target: 'http://localhost/api',
        //     },
        // }
    },
	plugins: [
        // new CommonsChunkPlugin({
        //     names: ['common', 'vendor'],
        //     minChunks: 2,
        // }),
		new CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		// new CommonsChunkPlugin('mount', 'mount.bundle.js'),
		new ExtractTextPlugin('style.css', { allChunks: true }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: 'Avalanche Canada',
        }),
        new HotModuleReplacementPlugin(),
	],
    // stats: {
    //     errorDetails: true
    // }
}
