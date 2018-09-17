import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DocumentByUID } from 'prismic/containers'
import { STATIC_PAGE, GENERIC } from 'constants/prismic'
import * as Pages from 'prismic/components/page'

export class StaticPage extends Component {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        title: PropTypes.string,
    }
    renderPage = props => <Pages.StaticPage {...this.props} {...props} />
    render() {
        const { uid } = this.props

        return (
            <DocumentByUID type={STATIC_PAGE} uid={uid}>
                {this.renderPage}
            </DocumentByUID>
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
        const { uid } = this.props

        return (
            <DocumentByUID type={GENERIC} uid={uid}>
                {this.renderPage}
            </DocumentByUID>
        )
    }
}
