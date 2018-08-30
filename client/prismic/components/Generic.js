import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Loading } from 'components/text'
import { Document } from 'prismic/new-containers'
import { generic } from 'prismic/params'
import { StructuredText } from 'prismic/components/base'

// TODO: Should be in a layouts folder

export default class Generic extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
        children: PropTypes.func,
    }
    static defaultProps = {
        children(props) {
            return Generic.renderers.body(props)
        },
    }
    static renderers = {
        bodyAndTitle({ loading, document }) {
            return (
                <Fragment>
                    <Loading show={loading} />
                    {document && (
                        <Fragment>
                            <h1>{document.data.title}</h1>
                            <StructuredText value={document.data.body} />
                        </Fragment>
                    )}
                </Fragment>
            )
        },
        body({ loading, document }) {
            return (
                <Fragment>
                    <Loading show={loading} />
                    {document && <StructuredText value={document.data.body} />}
                </Fragment>
            )
        },
    }
    render() {
        return (
            <Document {...generic(this.props.uid)}>
                {this.props.children}
            </Document>
        )
    }
}
