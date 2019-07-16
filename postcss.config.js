module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-import'),
        require('postcss-preset-env')({
            stage: 2,
            features: {
                'nesting-rules': true,
                'custom-media-queries': true,
                'color-mod-function': {
                    unresolved: 'warn',
                },
            },
        }),
    ],
}
