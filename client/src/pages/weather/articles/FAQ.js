import React, { Component } from 'react'
import { resolve } from 'react-resolver'
import { FAQ } from '../../../weather'
import { QueryDocument } from '../../../prismic'
import ArticleHeader from '../../ArticleHeader'

function fetchFAQ() {
    return QueryDocument('Vx6UbykAAD2SMmVr')
}

function Container({ document }) {
    return (
        <div>
            <ArticleHeader>
                Frequently asked questions (FAQ)
            </ArticleHeader>
            <FAQ document={document} />
        </div>
    )
}

export default resolve('document', fetchFAQ)(Container)
