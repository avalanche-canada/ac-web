import React from 'react'
import {About} from 'pages'
import {resolve, client} from 'react-resolver'
import {Api, Html} from 'prismic'

function Loader() {
    return (
        <p>Loading...</p>
    )
}

function I(arg) {
    return arg
}

export default resolve('document', function fetch() {
    return Api.QueryDocumentByUid('about').catch(err => new Error('Problem featching the data...'))
})(About)
