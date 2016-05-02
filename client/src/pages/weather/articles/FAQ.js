import React, { Component } from 'react'
import { resolve } from 'react-resolver'
import { FAQ } from '../../../weather'
import { QueryDocument } from '../../../prismic'

function fetchFAQ() {
    return QueryDocument('Vx6UbykAAD2SMmVr')
}

export default resolve('document', fetchFAQ)(FAQ)
