import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Status } from 'components/misc'
import { Generic as Container } from 'prismic/containers'
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
        bodyAndTitle({ status, document }) {
            return (
                <Fragment>
                    <Status {...status} />
                    {document && (
                        <Fragment>
                            <h1>{document.data.title}</h1>
                            <StructuredText value={document.data.body} />
                        </Fragment>
                    )}
                </Fragment>
            )
        },
        body({ status, document }) {
            return (
                <Fragment>
                    <Status {...status} />
                    {document && <StructuredText value={document.data.body} />}
                </Fragment>
            )
        },
    }
    render() {
        return <Container uid={this.props.uid}>{this.props.children}</Container>
    }
}
