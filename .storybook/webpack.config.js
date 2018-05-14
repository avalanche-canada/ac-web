var path = require('path')

module.exports = baseConfig => {
    // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // storybookBaseConfig.module.rules.push({
    //   test: /\.scss$/,
    //   loaders: ["style-loader", "css-loader", "sass-loader"],
    //   include: path.resolve(__dirname, "../")
    // });

    baseConfig.module.rules.push({
        test: /\.svg/,
        loader: 'file-loader',
    })

    baseConfig.module.rules.push({
        test: /\.png/,
        loader: 'file-loader',
    })

    baseConfig.module.rules.push({
        test: /\.css$/,
        include: [
            path.resolve(__dirname, '../client'),
            path.resolve(__dirname, '../node_modules'),
        ],
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                },
            },
            'postcss-loader',
        ],
    })

    // Return the altered config
    return baseConfig
}
