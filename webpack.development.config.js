const path = require('path')
const common = require('./webpack.common.config')

module.exports = Object.assign({}, common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/public'),
    },
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
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            context: __dirname,
                            localIdentName: '[name]__[local]--[hash:base64:4]',
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
})
