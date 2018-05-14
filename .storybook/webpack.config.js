var path = require('path')

module.exports = (storybookBaseConfig, configType) => {
    // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // storybookBaseConfig.module.rules.push({
    //   test: /\.scss$/,
    //   loaders: ["style-loader", "css-loader", "sass-loader"],
    //   include: path.resolve(__dirname, "../")
    // });
    console.warn(storybookBaseConfig)
    // Return the altered config
    return storybookBaseConfig
}
//
// {
//     resolve: {
//         modules: [
//             path.resolve(__dirname, '../node_modules'),
//             path.resolve(__dirname, '../client'),
//         ],
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                 },
//             },
//             {
//                 test: /\.css$/,
//                 include: /node_modules/,
//                 use: {
//                     loader: 'css-loader',
//                 },
//             },
//             {
//                 test: /\.css$/,
//                 exclude: /node_modules/,
//                 use: [
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             modules: true,
//                             importLoaders: 1,
//                             localIdentName: '[name]__[local]--[hash:base64:5]',
//                         },
//                     },
//                     {
//                         loader: 'postcss-loader',
//                     },
//                 ],
//             },
//             {
//                 test: /\.(eot|woff|woff2|ttf|png|jpg|svg)$/,
//                 use: ['file-loader'],
//             },
//             {},
//         ],
//     },
// }
