import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import Axios from 'axios'

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
import postcssImport from 'postcss-import'
import cssnext from 'postcss-cssnext'
import postcssModules from 'postcss-modules'
import cssnano from 'cssnano'

const cssExportMap = {}
const postCSSPlugins = [
    postcssImport(),
    cssnext({
        warnForDuplicates: false
    }),
    postcssModules({
        getJSON(id, exportTokens) {
            cssExportMap[id] = exportTokens
        }
    }),
]

if (process.env.NODE_ENV === 'production') {
    postCSSPlugins.push(cssnano())
}

export default {
    entry: 'client/src/main.js',
    dest: 'dist/public/main.js',
    format: 'iife',
    sourceMap: true,
    plugins: [
        image(),
        builtins(),
        json(),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        postcss({
            plugins: postCSSPlugins,
            getExport(id) {
                return cssExportMap[id]
            },
            extract: 'dist/public/style.css',
            sourceMap: true,
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        commonjs({
            exclude: 'client/src/**',
            include: 'node_modules/**',
            namedExports: {
                'react-dom': Object.keys(ReactDOM),
                'node_modules/react/react.js': Object.keys(React),
                'node_modules/immutable/dist/immutable.js': Object.keys(Immutable),
                'node_modules/react-router/node_modules/prop-types/index.js': Object.keys(PropTypes),
                'node_modules/axios/index.js': Object.keys(Axios),
            },
        }),
        // eslint({
        //     exclude: [
        //         'client/src/styles/**/*.css',
        //     ]
        // }),
        replace({
            exclude: 'node_modules/**',
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ],
}
