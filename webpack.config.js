var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
var DefinePlugin = webpack.DefinePlugin
var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin
var ContextReplacementPlugin = webpack.ContextReplacementPlugin

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
            mapbox: 'mapbox',
            prismic: 'prismic',
            cloudinary: 'cloudinary',
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
    devtool: 'eval-source-map',
    devServer: {
        progress: true,
        colors: true,
        hot: true,
        contentBase: 'dist/public',
        historyApiFallback: true,
    },
	plugins: [
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
            inject: 'body',
            filename: 'index.html',
        }),
        new HotModuleReplacementPlugin(),
        new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
	],
    // stats: {
    //     errorDetails: true
    // }
}
