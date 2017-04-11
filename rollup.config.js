// import path from 'path'

// Rollup plugins
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import image from 'rollup-plugin-image'

// PostCSS plugins
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'

export default {
    entry: 'client/src/main.js',
    dest: 'dist/public/main.js',
    format: 'iife',
    sourceMap: true,
    plugins: [
        image(),
        builtins(),
        json(),
        postcss({
            plugins: [
                simplevars(),
                nested(),
                cssnext({ warnForDuplicates: false }),
                cssnano(),
            ],
            extensions: ['.css'],
            extract : 'dist/public/style.css',
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs({
            exclude: 'client/src/**',
            include: ['node_modules/**'],
            namedExports: {
                'node_modules/react-dom/index.js': ['render'],
                'node_modules/react/react.js': ['createElement', 'PureComponent', 'Component', 'DOM', 'cloneElement'],
                'node_modules/react-router/node_modules/prop-types/index.js': ['object', 'func', 'arrayOf', 'oneOfType', 'element', 'shape', 'string', 'array', 'bool'],
            },
        }),
        // eslint({
        //     exclude: [
        //         'client/src/styles/**/*.css',
        //     ]
        // }),
        babel({
            exclude: 'node_modules/**',
        }),
        replace({
            exclude: 'node_modules/**',
            // ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ],
}
