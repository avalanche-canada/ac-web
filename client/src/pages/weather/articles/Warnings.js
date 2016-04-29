import React from 'react'
import { QueryDocument, Html } from '../../../prismic'
import { resolve } from 'react-resolver'
import ArticleHeader from '../../ArticleHeader'
import Image from '../../../weather/Image'
import warnings from './images/warnings.png';

function fetchWarnings() {
    return QueryDocument('VyOU5yYAAPU6X40L')
}

function Warnings({ document }) {
    return (
        <div>
            <ArticleHeader>Weather warnings</ArticleHeader>
            <Html document={document} />
            <Image url={warnings} />
        </div>
    )
}

export default resolve('document', fetchWarnings)(Warnings)
