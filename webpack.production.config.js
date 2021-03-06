const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const common = require('./webpack.common.config')

module.exports = Object.assign({}, common, {
    mode: 'production',
    devtool: 'source-map',
    output: Object.assign({}, common.output, {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js',
    }),
    plugins: common.plugins.concat([
        new LodashModuleReplacementPlugin({
            memoizing: true,
            flattening: true, // for Victory
            currying: true, // for Victory
            paths: true, // for Victory
            placeholders: true, // for Victory
            shorthands: true, // for Victory
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
    ]),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            context: __dirname,
                            importLoaders: 1,
                            localIdentName: '[hash:base64:4]',
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|svg)$/,
                use: ['file-loader'],
            },
            {},
        ],
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            name: 'vendors',
            chunks: 'initial',
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    toplevel: true,
                    compress: {
                        passes: 3,
                        pure_getters: true,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
})
