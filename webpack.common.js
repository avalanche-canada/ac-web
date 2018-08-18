var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var Webpack = require('webpack')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'client/index.js'),
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/',
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'client')],
        alias:{
            'mapbox-gl': path.resolve(__dirname, 'node_modules/mapbox-gl/dist'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/index.tpl.html'),
            filename: 'index.html',
        }),
        new Webpack.HashedModuleIdsPlugin(),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
        }),
        new ExtractTextPlugin({
			filename: "[name].[contenthash].css",
			allChunks: true,
		})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
                ,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ]
                })
                ,
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|svg)$/,
                use: ['file-loader'],
            },
            {},
        ],
    },
}
