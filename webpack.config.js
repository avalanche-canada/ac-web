var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
var DefinePlugin = webpack.DefinePlugin
var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin

module.exports = {
	entry: {
        app: ['webpack-hot-middleware/client?reload=true', path.resolve(__dirname, 'client/src/main.js')],
	},
	output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name].js',
	},
	module: {
        preLoaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint'
		}],
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
            path.resolve('./client/src'),
            path.resolve('./node_modules')
        ],
        alias: {
            mapbox: 'mapbox-gl/dist/mapbox-gl',
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
    eslint: {
        failOnWarning: false,
        failOnError: false,
        // failOnError: true,
    },
    devtool: 'eval-source-map',
    watch: true,
    devServer: {
        progress: true,
        colors: true,
        hot: true,
        contentBase: 'dist/public',
        historyApiFallback: true,
    },
	plugins: [
        new CaseSensitivePathsPlugin(),
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
        }),
		new ExtractTextPlugin('style.css', { allChunks: true }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/src/index.tpl.html'),
            filename: 'index.html',
        }),
        new HotModuleReplacementPlugin(),
	],
}
