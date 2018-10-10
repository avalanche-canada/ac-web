import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Document } from 'prismic/containers'
import * as params from 'prismic/params'
import { STATIC_PAGE, GENERIC, SPONSOR } from 'constants/prismic'
import * as Pages from 'prismic/components/page'

export class StaticPage extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string,
    }
    renderPage = props => <Pages.StaticPage {...this.props} {...props} />
    render() {
        return (
            <Document
                {...params.uid(STATIC_PAGE, this.props.uid)}
                fetchLinks={`${SPONSOR}.name,${SPONSOR}.url,${SPONSOR}.image-229`}>
                {this.renderPage}
            </Document>
        )
    }
}

export class Generic extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string,
    }
    renderPage = props => <Pages.Generic {...this.props} {...props} />
    render() {
        return (
            <Document {...params.uid(GENERIC, this.props.uid)}>
                {this.renderPage}
            </Document>
        )
    }
}
