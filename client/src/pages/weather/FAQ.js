import React, { Component } from 'react'
import { resolve } from 'react-resolver'
import { FAQ } from '../../weather'
import { QueryDocument } from '../../prismic'

@resolve('faq', function fetchFAQ() {
    return QueryDocument('Vx6UbykAAD2SMmVr')
})
export default class Container extends Component {
    render() {
        return (
            <FAQ document={this.props.faq} />
        )
    }
}
