var path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('../../webpack.common.config')

module.exports = {
    mode: 'production',
    entry: {
        avid: path.resolve(__dirname, 'avid.js'),
        avq: path.resolve(__dirname, 'avalanche-quebec.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'avcan',
        libraryTarget: 'commonjs2',
    },
    externals: ['react'],
    resolve,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
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
                loader: 'url-loader',
                options: {
                    limit: 10000000,
                },
            },
        ],
    },
}
