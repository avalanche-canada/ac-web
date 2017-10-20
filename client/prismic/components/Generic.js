import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Status } from 'components/misc'
import { generic } from 'containers/connectors'
import { StructuredText } from 'prismic/components/base'
import { parse } from 'prismic'

@generic
export default class Generic extends PureComponent {
    static propTypes = {
        status: PropTypes.object.isRequired,
        document: PropTypes.object,
    }
    render() {
        const { document, status } = this.props

        if (document) {
            const { data: { body } } = parse(document)

            return <StructuredText value={body} />
        }

        return <Status {...status.toJSON()} />
    }
}
