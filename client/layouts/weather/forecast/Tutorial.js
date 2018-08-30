import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Loading } from 'components/text'
import { StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { mw } from 'prismic/params'

export default class Tutorial extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
    }
    renderChildren = ({ loading, document }) => (
        <Fragment>
            <Loading show={loading}>Loading tutorial...</Loading>
            {document && <StructuredText value={document.data.tutorial} />}
        </Fragment>
    )
    render() {
        return (
            <Document {...mw.tutorial(this.props.uid)}>
                {this.renderChildren}
            </Document>
        )
    }
}
