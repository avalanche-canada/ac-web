module.exports = {
    testURL: 'http://localhost/',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css)$': 'identity-obj-proxy',
    },
    moduleDirectories: ['node_modules', 'client'],
    setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
}
