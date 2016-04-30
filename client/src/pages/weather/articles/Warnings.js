import React from 'react'
import { QueryDocument, Html } from '../../../prismic'
import { resolve } from 'react-resolver'
import ArticleHeader from '../../ArticleHeader'
import Image from '../../../weather/Image'

function fetchWarnings() {
    return QueryDocument('VyOU5yYAAPU6X40L')
}

function Warnings({ document }) {
    return (
        <div>
            <ArticleHeader>Weather warnings</ArticleHeader>
            <Html document={document} />
            <Image url={'http://avalanche.ca/assets/images/weather/warnings.png'} />
        </div>
    )
}

export default resolve('document', fetchWarnings)(Warnings)
