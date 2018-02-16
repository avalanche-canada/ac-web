import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Status } from 'components/misc'
import { Generic as Container } from 'prismic/containers'
import { StructuredText } from 'prismic/components/base'
import { parse } from 'prismic'

export default class Generic extends PureComponent {
    static propTypes = {
        uid: PropTypes.string.isRequired,
    }
    children = ({ status, document }) => (
        <Fragment>
            <Status {...status} />
            {document && <StructuredText value={parse(document).data.body} />}
        </Fragment>
    )
    render() {
        return <Container uid={this.props.uid}>{this.children}</Container>
    }
}
