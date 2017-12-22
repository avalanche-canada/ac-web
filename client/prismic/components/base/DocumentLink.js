import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { pathname } from 'utils/prismic'
import { Document } from 'prismic/containers'

const DocumentType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
})

export default class DocumentLink extends PureComponent {
    static propTypes = {
        value: PropTypes.shape({
            document: DocumentType.isRequired,
            isBroken: PropTypes.bool.isRequired,
        }).isRequired,
        document: DocumentType,
        status: PropTypes.object,
        children: PropTypes.node,
    }
    renderer({ status, document }) {
        if (status.isLoading || !document) {
            return 'Loading...'
        }

        return document.data[document.type].title.value
    }
    get children() {
        const { type, uid } = this.props.value.document

        return (
            <Document type={type} uid={uid}>
                {this.renderer}
            </Document>
        )
    }
    render() {
        const { children, value } = this.props

        return (
            <Link to={pathname(value.document)}>
                {children || this.children}
            </Link>
        )
    }
}
